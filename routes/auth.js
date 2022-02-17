const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../prisma");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/index");
require("dotenv");
var cors = require("cors");
const { error } = require("console");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.use(cors());

/**
 * REGISTER USER
 */
router.post("/register", async (req, res) => {
  let body = req.body;
  var date = new Date();
  date.toLocaleDateString("fr");

  if (
    body.username.length === 0 ||
    body.email.length === 0 ||
    body.password.length === 0 ||
    body.username === null ||
    body.email === null ||
    body.password === null
  ) {
    res.status(400).json({
      type: "No data provided",
      message: "Provide valid data",
    });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.person.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashed,
        created_on: date,
      },
    });
    res.status(200).json(newUser);
  } catch (e) {
    res.status(400).json({
      type: "Oops",
      message: "This email or username is already used",
    });
  }
});

/**
 * LOGIN USER
 */
router.post("/login", async (req, res) => {
  let body = req.body;

  if (
    body.email === null ||
    body.password === null ||
    body.email.length === 0 ||
    body.password.length === 0
  ) {
    return res.status(400).json({
      type: "No data provided",
      message: "Provide valid data",
    });
  }

  const user = await prisma.person.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user == null) {
    return res.status(500).json({
      type: "Oops",
      message: "No user found",
    });
  }

  try {
    if (await bcrypt.compare(body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      console.log(accessToken);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(500).json({
        type: "Bad credentials",
        message: "Try again",
      });
    }
  } catch (e) {
    throw e;
  }
});

/**
 * TEST TOKEN
 */
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        id: req.user.id,
      },
    });
    user[0].password = null;
    res.json(user);
  } catch (e) {
    throw e;
  }
});

/**
 * GET MOVIE
 */
router.get("/movie", authenticateToken, async (req, res) => {
  try {
    const to_watch = await prisma.to_watch.findMany({
      where: {
        idperson: req.user.id,
      },
    });
    res.json(to_watch);
  } catch (e) {
    throw e;
  }
});

router.put("/update", authenticateToken, async (req, res) => {});

module.exports = router;
