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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
  });

app.listen(PORT, () => {
    console.log("API listening on port", PORT);
})
