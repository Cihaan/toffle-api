const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const authenticateToken = require("../middleware/index");
var cors = require("cors");
require("dotenv");

router.use(cors());

router.post("/info/:id", authenticateToken, async (req, res) => {
  let body = req.body;
  const id = parseInt(req.params.id);

  try {
    const newUser = await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        username: body.username,
        email: body.email,
      },
    });
    res.status(200).json({
      title: "Notification",
      message: "Your informations have been updated successfully",
    });
  } catch (e) {
    res.status(400).json({
      type: "Oops",
      message: "This email or username is already used",
    });
  }
});

router.post("/pwd/:id", authenticateToken, async (req, res) => {
  let body = req.body;
  const id = parseInt(req.params.id);

  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.password, salt);

    if (body.password !== body.cpassword) {
      res.status(400).json({
        type: "Oops",
        message: "The provided passwords don't match",
      });
    }

    const newPassword = await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        password: hashed,
      },
    });

    res.status(200).json({
      title: "Notification",
      message: "Your informations have been updated successfully",
    });
  } catch (error) {
    throw error
    // res.status(400).json({
    //   type: "Oops",
    //   message: "The provided passwords don't match",
    // });
  }
});

module.exports = router;
