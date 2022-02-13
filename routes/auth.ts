import { Router } from 'express';
import { Request, Response } from 'express';
import prisma from '../src/utils/connect'
import jwt from 'jsonwebtoken'


const router = Router();
require('dotenv').config()

// REGISTER ALL FIELDS
router.post('/register', (req: Request, res: Response) => {
    //récupérer crypter si dispo
    //jwt
})


// get all users
router.get('/test', (req: Request, res: Response) => {
    const allPersons = prisma.person.findMany()
    .then((rep) => {
        res.json(rep)
    })
    .catch((err) => {
        res.status(401).json({message: err.message})
    })
})

export default router