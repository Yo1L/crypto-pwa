const path = require('path')
require('dotenv').config()
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const express = require('express')
const axios = require('axios')
const app = express()

const PORT = process.env.REACT_APP_SERVER_PORT || 5000
const PRICES_EXPIRATION_IN_SECONDS = 10
let lastPrices = {}

var pusher = new Pusher({
  appId: process.env.REACT_APP_PUSHER_APP_ID,
  key: process.env.REACT_APP_PUSHER_KEY,
  secret: process.env.REACT_APP_PUSHER_SECRET,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  useTLS: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS middleware
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
})

/**
 * Every PRICES_EXPIRATION_IN_SECONDS seconds we get the prices
 */
setInterval(() => {
    // 
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
    .then(response => {
        lastPrices = response.data

        console.log("New prices - BTC: $" + lastPrices.BTC.USD)
        pusher.trigger('coin-prices', 'prices', {
            prices: lastPrices
        })
    })
}, PRICES_EXPIRATION_IN_SECONDS * 1000)

app.set('port', PORT)

/**
 * return the last stored prices
 */
app.get('/prices/last', (req, res) => {
    res.send({
        prices: lastPrices
    })
    console.log('get /prices/last')
})

/**
 * index.html
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 * Tell to the world that we are ready :)
 */
app.listen(PORT, () => {
    console.log("Running on port " + PORT)
})