const express = require('express')
const cookie_parser=require('cookie-parser')
const route = require('./routes/route')
var bodyParser = require('body-parser')
var cors = require('cors')

const PORT = 3333
const app = express()


app.use(express.json)
app.use(cookie_parser('1234'))
app.use(route)
app.use(cors)

app.get("/", (req, res) => {
    res.send("azer")
})

app.listen(PORT, () => {
    console.log("API listening on port", PORT);
})
