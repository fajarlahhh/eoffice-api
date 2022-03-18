const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const disposisi = require('./routes/disposisi')
const auth = require('./routes/auth')
const info = require('./routes/info')

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.disable('etag')
app.disable('x-powered-by')

app.use('/auth', auth)
app.use('/disposisi', disposisi)
app.use('/', info)

app.listen(port, () => console.log(`Started app on http://localhost:${port}`))