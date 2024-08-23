console.clear()

let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
const http = require('http');
const history = require('connect-history-api-fallback');

require('dotenv').config({
  path: `.env.local`,
  override: true
})

let paymentsRoutes = require('./routes/paymentsRouter')
let usersRoutes = require('./routes/usersRouter')
let youtubeAccountsRoutes = require('./routes/youtubeAccountsRouter')

let app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const staticFileMiddleware = express.static('views');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true
}));
app.use(staticFileMiddleware);


app.use('/payment/', paymentsRoutes)
app.use('/users/', usersRoutes)
app.use('/youtube-accounts/', youtubeAccountsRoutes)

http.createServer(app).listen(80, () => {
  console.log(`[success] http server live on port 80`)
});

if (process.env.DB_URL) {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log('[success] connected to db')

  }).catch((err) => {
    console.log('[fail] connection to db failed', err)
  })
} else {
  console.log('Specify DB connection');
}