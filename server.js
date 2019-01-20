const Path = require('path')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const express = require('express')
const axios = require('axios')
const app = express()

const PORT = 5000
let lastPrices = {}

var pusher = new Pusher({
  appId: '695315',
  key: 'b8188b32624d2ddbdbae',
  secret: '4582d83c5690ac4721d3',
  cluster: 'eu',
  encrypted: true
})

// pusher.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });

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
}, 10000)

app.set('port', PORT)

// app.post('/prices/new', (req, res) => {
//     pusher.trigger('coin-prices', 'prices', {
//         prices: req.body.prices
//     })
//     console.log('post with data' + req.body)
//     res.sendStatus(200)
// })

app.get('/prices/last', (req, res) => {
    res.send({
        prices: lastPrices
    })
    console.log('get /prices/last')
})

app.listen(PORT, () => {
    console.log("Running on port " + PORT)
})