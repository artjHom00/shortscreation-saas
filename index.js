console.clear()

let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let https = require('https');
const http = require('http');
const history = require('connect-history-api-fallback');
let fs = require('fs');

// serve the API on 80 (HTTP) port


require('dotenv').config({ path: `.env.local`, override: true })

let paymentsRoutes = require('./routes/paymentsRouter')
let usersRoutes = require('./routes/usersRouter')
let youtubeAccountsRoutes = require('./routes/youtubeAccountsRouter')

let app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const staticFileMiddleware = express.static('views');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);


app.use('/payment/', paymentsRoutes)
app.use('/users/', usersRoutes)
app.use('/youtube-accounts/', youtubeAccountsRoutes)

http.createServer(app).listen(80, () => {
  console.log(`[success] http server live on port 80`)
});

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/shortscreation.tech/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/shortscreation.tech/fullchain.pem'),
}, app).listen(process.env.PORT, () => {
  console.log(`[success] https server live on port ${process.env.PORT}`)
});

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