import express from 'express'
import routes from '../routes/route'
import config from 'config'
import connect from './utils/connect'

const app = express()
const PORT = config.get<number>('port')


app.use(express.json())
app.use(routes)


app.listen(PORT, async () => {
    console.log(`App is running at http://localhost:${PORT}`);

    await connect()
})