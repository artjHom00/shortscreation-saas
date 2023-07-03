console.clear()

let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

require('dotenv').config({ path: `.env.local`, override: true })

let usersRoutes = require('./routes/users')

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/users/', usersRoutes)

app.listen(process.env.PORT, () => {
    console.log(`[success] server live on port ${process.env.PORT}`)
})

if (process.env.DB_URL) {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log('[success] connected to db')
    }).catch((err) => {
      console.log('[fail] connection to db failed', err)
    })
  } else {
    console.log('Specify DB connection');
  }