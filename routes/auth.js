const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../prisma");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/index")
require('dotenv')

/**
 * REGISTER USER
 */
router.post("/register", async (req, res) => {
  let body = req.body;
  var date = new Date();
  date.toLocaleDateString("fr");

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
    res.json(newUser);
  } catch (e) {
    res.status(500).send("Credentials already used");
  }
});

/**
 * LOGIN USER
 */
router.post("/login", async (req, res) => {
  let body = req.body;

  if (body.email === null && body.password === null) {
    return res.status(500).send("Provide valid credentials");
  }

  const user = await prisma.person.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user == null) {
    return res.status(500).send("Provide valid credentials");
  }

  try {
    if (await bcrypt.compare(body.password, user.password)) {

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({accessToken: accessToken})

    } else {
      res.status(500).send("Provide valid credentials");
    }
    
  } catch (e) {
    throw e;
  }
});


/**
 * TEST TOKEN
 */
router.get('/movie', authenticateToken, async (req, res) => {
    try {
        const to_watch = await prisma.to_watch.findMany({
            where: {
                idperson: 1
            },
        })
        res.json(to_watch)
    } catch (e) {
        throw e
    }
})

router.put('/update', authenticateToken, async (req, res) => {

})

module.exports = router;
