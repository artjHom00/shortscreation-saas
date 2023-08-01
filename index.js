console.clear()

let express = require('express')
const cors = require('cors')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

require('dotenv').config({ path: `.env.local`, override: true })

let usersRoutes = require('./routes/usersRouter')
let youtubeAccountsRoutes = require('./routes/youtubeAccountsRouter')

let app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users/', usersRoutes)
app.use('/youtube-accounts/', youtubeAccountsRoutes)

app.listen(process.env.PORT, () => {
    console.log(`[success] server live on port ${process.env.PORT}`)
})

if (process.env.DB_URL) {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log('[success] connected to db')

    // let { generateAndUploadShort } = require('./providers/shorts')  

    
    // generateAndUploadShort('64c631bbf8a64ad0565c45fc').then((res) => {
    //   console.log("🚀 ~ file: index.js:33 ~ generateAndUploadShort ~ res:", res)
    // }).catch(err => {
    //   console.log("🚀 ~ file: index.js:34 ~ generateAndUploadShort ~ err:", err)
      
    // })

    }).catch((err) => {
      console.log('[fail] connection to db failed', err)
    })
  } else {
    console.log('Specify DB connection');
  }