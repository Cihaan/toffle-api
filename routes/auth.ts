import { Router } from "express";
import { Request, Response } from "express";
import prisma from "../src/utils/connect";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();
require("dotenv").config();

const salt = 10;

/**
 * REGISTER
 */
router.post("/register", async (req: Request, res: Response) => {
  let data = req.body;
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let u;
  let e;

  if (data.username && data.email) {
    //see if not already taken
    try {
      u = await prisma.person.findMany({
        select: {
          username: true,
        },
        where: {
          username: data.username,
        },
      });

      e = await prisma.person.findMany({
        select: {
          email: true,
        },
        where: {
          email: data.email,
        },
      });

      if (u.length === 0 && e.length === 0) {
        const hash = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.person.create({
          data: {
            username: data.username,
            email: data.email,
            password: hash,
            created_on: date,
          },
        });

        res.json(newUser);
      } else {
        res.send(401).send();
      }
    } catch (error) {
      res.status(401);
    }
  }
});

// get all users
router.get("/test", (req: Request, res: Response) => {
  const allPersons = prisma.person
    .findMany()
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.status(401).json({ message: err.message });
    });
});

export default router;
