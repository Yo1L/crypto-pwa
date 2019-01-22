import React, { Component } from 'react'
import './Trends.css'
import Pusher from 'pusher-js'
import { Level, Box, Heading, Section } from 'react-bulma-components/full'

const style = { textAlign: 'center' };

export default class Trends extends Component {
    constructor () {
        super()
        this.state = {
            btc: '',
            ltc: '',
            eth: ''
        }
    }

    setPrices (data) {
        if (navigator.onLine) {
            localStorage.setItem('dataPrices', JSON.stringify(data))
        }
        this.setState({ btc: data.prices.BTC.USD })
        this.setState({ ltc: data.prices.LTC.USD })
        this.setState({ eth: data.prices.ETH.USD })
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
            <Section>
                <Box>
                    <Level renderAs="nav">
                        <Level.Item style={style}>
                            <div>
                                <Heading renderAs="p" heading>
                                    BTC
                                </Heading>
                                <Heading renderAs="p">${ this.state.btc }</Heading>
                            </div>
                        </Level.Item>
                        <Level.Item style={style}>
                            <div>
                                <Heading renderAs="p" heading>
                                    ETH
                                </Heading>
                                <Heading renderAs="p">${ this.state.eth }</Heading>
                            </div>
                        </Level.Item>
                        <Level.Item style={style}>
                            <div>
                                <Heading renderAs="p" heading>
                                    LTC
                                </Heading>
                                <Heading renderAs="p">${ this.state.ltc }</Heading>
                            </div>
                        </Level.Item>
                    </Level>
                </Box>
            </Section>
        )
    }
}