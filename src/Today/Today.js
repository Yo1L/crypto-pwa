import React, { Component } from 'react'
import './Today.css'
import Pusher from 'pusher-js'

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
        if (navigator.onLine) {
            localStorage.setItem('dataPrices', JSON.stringify(data))
        }
        this.setState({ btcprice: data.prices.BTC.USD })
        this.setState({ ltcprice: data.prices.LTC.USD })
        this.setState({ ethprice: data.prices.ETH.USD })
    } 

    componentWillMount () {
        this.pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true
        });

        // init with the last prices
        if (navigator.onLine) {
            fetch('/prices/last')
            .then(response => response.json())
            .then(response => {
                this.setPrices(response)
            })
        }
        else {
            let dataPrices = localStorage.getItem('dataPrices')
            if (dataPrices) {
                this.setPrices(JSON.parse(dataPrices))
            }
        }

        // wait for any updates
        this.channelCoinPrices = this.pusher.subscribe('coin-prices')
        this.channelCoinPrices.bind('prices', (data) => {
            this.setPrices(data)
        }, this)
    }

    render () {
        return (
            <div className="today--section container">
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