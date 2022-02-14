const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const prisma = require('../prisma')
var bodyParser = require('body-parser')


const salt = async function() {
    await bcrypt.genSalt()
}

router.get('/', async (req, res) => {
    let azer = prisma.person.findMany({})
    res.send(azer)
})

//register user
router.post('/register', async (req, res) => {
    let body = req.body
    console.log("ici");

    try {

        console.log("ici");
        const hashed = await bcrypt.hash(body.password)
        console.log("ici");
        const newUser = prisma.person.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashed
            }
        })
        res.json(newUser)
    } catch(error) {

    }
})

module.exports = router