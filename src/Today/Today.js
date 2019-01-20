import React, { Component } from 'react'
import './Today.css'
import Pusher from 'pusher-js'
import axios from 'axios'

class Today extends Component {
    constructor () {
        super()
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        }
    }

    setPrices (data) {
        this.setState({ btcprice: data.prices.BTC.USD })
        this.setState({ ltcprice: data.prices.LTC.USD })
        this.setState({ ethprice: data.prices.ETH.USD })
    } 

    componentWillMount () {
        this.pusher = new Pusher('b8188b32624d2ddbdbae', {
            cluster: 'eu',
            forceTLS: true
        });

        // init with the last prices
        axios.get('/prices/last')
        .then(response => {
            this.setPrices(response.data)
        })

        // wait for any updates
        this.channelCoinPrices = this.pusher.subscribe('coin-prices')
        this.channelCoinPrices.bind('prices', (data) => {
            this.setPrices(data)
        }, this)
    }

    render () {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcprice}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column eth--section">
                        <h5>${this.state.ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column ltc--section">
                        <h5>${this.state.ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today;