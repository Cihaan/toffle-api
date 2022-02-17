const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const authenticateToken = require("../middleware/index");
var cors = require("cors");
require("dotenv");

router.use(cors());

router.post("/info/:id",authenticateToken, async (req, res) => {
  let body = req.body;
  const id = parseInt(req.params.id);

  try {
    const newUser = await prisma.person.update({
        where: {
            id: id
        },
      data: {
        username: body.username,
        email: body.email
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

router.post("/pwd", async (req, res) => {
    //update password here
});

module.exports = router;
