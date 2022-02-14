const express = require('express')
const cookie_parser=require('cookie-parser')
const routes = require('./routes/route')
var bodyParser = require('body-parser')
var cors = require('cors')

const PORT = 5000
const app = express()


app.use(express.json())
app.use(cookie_parser('1234'))
app.use(routes)
app.use(cors())

app.get("/", (req, res) => {
    res.send("azer")
})

app.listen(PORT, () => {
    console.log("API listening on port", PORT);
})
