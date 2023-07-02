let express = require('express')
require('dotenv').config()

let app = express()

app.get('/test', (req, res) => {
    res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
    console.log(`[success] server live on port ${process.env.PORT}`)
})