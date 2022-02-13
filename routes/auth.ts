import { Router } from 'express';
import { Request, Response } from 'express';
import prisma from '../src/utils/connect'

const router = Router();


// REGISTER ALL FIELDS
router.get('/es', (req: Request, res: Response) => {
    // res.json({"azer": "azer"})
    
    
})


// get all users
router.get('/test', (req: Request, res: Response) => {
    // res.json({"azer": "azer"})
    const allPersons = prisma.person.findMany()
    .then((rep) => {
        res.json(rep)
    })
    .catch((err) => {
        res.status(401).json({message: err.message})
    })
})

export default router