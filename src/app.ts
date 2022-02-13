import express from 'express'
import routes from '../routes/route'
import connect from './utils/connect'
import cors from 'cors'
import prisma from './utils/connect'


const app = express()
require('dotenv').config()
const PORT = process.env.PORT


app.use(express.json())
app.use(routes)
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});




app.listen(PORT, async () => {
    
    console.log(`App is running at http://localhost:${PORT}`);

})