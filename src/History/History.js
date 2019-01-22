import React, { Component } from 'react'
import './History.css'
import moment from 'moment'

class History extends Component {
    constructor () {
        super()
        this.state = {
            todayprices: {},
            yesterdayprices: {},
            twodaysprices: {},
            threedaysprices: {},
            fourdaysprices: {}
        }
    }

    getPrice (currency, date) {
        return fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + currency + '&tsyms=USD&ts=' + date).then(response => response.json());
    }

    getPrices(date, stateKey) {
        Promise.all([
            this.getPrice('BTC', date),
            this.getPrice('LTC', date),
            this.getPrice('ETH', date)
        ])
        .then(response => {
            let [btc, ltc, eth] = response
            let newState = {
                date: moment.unix(date).format("MMMM Do YYYY"),
                btc: btc.BTC.USD,
                ltc: ltc.LTC.USD,
                eth: eth.ETH.USD
            }

            this.setState({ [stateKey]: newState })
        })
    }

    componentWillMount () {
        let today = moment().unix()
        this.getPrices(today, 'todayprices')

        let yesterday = moment().subtract(1, 'days').unix()
        this.getPrices(yesterday, 'yesterdayprices')

        let twodaysprices = moment().subtract(2, 'days').unix()
        this.getPrices(twodaysprices, 'twodaysprices')

        let threedaysprices = moment().subtract(3, 'days').unix()
        this.getPrices(threedaysprices, 'threedaysprices')

        let fourdaysprices = moment().subtract(4, 'days').unix()
        this.getPrices(fourdaysprices, 'fourdaysprices')
    }

    render () {
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
                    <div className="history--section__box__inner">
                        <h4>{this.state.todayprices.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayprices.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.todayprices.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.todayprices.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.yesterdayprices.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.yesterdayprices.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.yesterdayprices.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.yesterdayprices.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.twodaysprices.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.twodaysprices.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.twodaysprices.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.twodaysprices.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.threedaysprices.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.threedaysprices.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.threedaysprices.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.threedaysprices.ltc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history--section__box__inner">
                        <h4>{this.state.fourdaysprices.date}</h4>
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.fourdaysprices.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.fourdaysprices.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.fourdaysprices.ltc}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default History