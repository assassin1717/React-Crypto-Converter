import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Header, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { API_URL } from '../api'
import { prepareCoinsList, prepareExchangesList } from '../lib'
import { Link } from 'react-router-dom'

class Tickers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            searched: false,
            results: [],
            inputs: ['BTC', 'Binance'],
            tempExc: ''
        }

        this.setTempExc=this.setTempExc.bind(this)
        this.searchTrickers = this.searchTrickers.bind(this)
    }

    setTempExc(e){
        this.setState({
            tempExc: e.target.children[0].innerHTML
        })
    }

    setDropdownValue(e) {
        const { inputs } = this.state
        let newValue = inputs
        newValue[0] = e.target.children[0].innerHTML
        this.setState({
            inputs: newValue
        })
    }

    searchTrickers() {
        this.setState({
            loaded: false
        })
        const { inputs, tempExc } = this.state
        const { cryptos } = this.props
        let id = cryptos.data.find(x => x.symbol === inputs[0].toLowerCase()).id
        axios.get(API_URL + `/coins/${id}/tickers`)
            .then(resp => {
                let newValue = inputs
                newValue[1] = tempExc
                this.setState({
                    results: resp.data,
                    loaded: true,
                    searched: true,
                    inputs: newValue
                })
            })
            .catch(err => {
                this.setState({
                    loaded: true
                })
                console.log(err)
            })
    }

    formatDate(date){
        let rawDate=date.split('T')
        let rawTime=rawDate[1].split('+')
        return `${rawDate[0]}, ${rawTime[0]}`
    }

    render() {
        const { currencies, currLoaded, exchanges, exchLoaded } = this.props
        const { searched, loaded, results, inputs } = this.state
        let coinsOptions = [], exchangesOptions = []
        if (currLoaded && exchLoaded && loaded) {
            coinsOptions = prepareCoinsList(currencies.data)
            exchangesOptions = prepareExchangesList(exchanges.data)
            return (
                <div id='main-body'>
                    <div id='container'>
                        <Header as='h1' color='blue'>Tickers</Header>
                        <br />
                        <table align='center'>
                            <tbody className="text-left">
                                <tr>
                                    <td><Header as='h4' color='blue'>Coin:</Header></td>
                                    <td><Header as='h4' color='blue'>Market:</Header></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Dropdown className='small-padding resize-drop' size='huge' defaultValue={coinsOptions[0].key} onChange={e => this.setDropdownValue(e)} search selection options={coinsOptions} />
                                    </td>
                                    <td>
                                        <Dropdown id="to" className='small-padding resize-drop' size='huge' defaultValue={coinsOptions[0].key} onChange={this.setTempExc} search selection options={exchangesOptions} />
                                    </td>
                                    <td>
                                        <Button className='small-padding' primary size='huge' onClick={this.searchTrickers}>Search</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        {searched &&
                            Object.keys(results.tickers).map(key => {
                                if (results.tickers[key]['market'].name === inputs[1]) {
                                    return (
                                        <div key={key} className='tickers-cards'>
                                            <div className='text-left'>
                                                <Header as='h1'>{results.tickers[key].base}/{results.tickers[key].target}</Header>
                                                <Header as='h3'>Last value: {results.tickers[key].last} {results.tickers[key].target}</Header>
                                                <Header as='h3'>Last trade: {this.formatDate(results.tickers[key].last_traded_at)}</Header>
                                            </div>
                                            <div className='text-right'>
                                                <Header as='h3'><Link to='#'>View more</Link></Header>
                                                <Header as='h3'>Market: {results.tickers[key]['market'].name}</Header>
                                                <Header as='h3'>Market volume: {(results.tickers[key].volume).toFixed(3)}</Header>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    return null
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <Loader active inline='centered' />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cryptos: state.getCryptosReduc.cryptos,
        cryptosLoaded: state.getCryptosReduc.loaded,
        cryptosError: state.getCryptosReduc.error,
        currencies: state.getSupportedCurrReduc.currencies,
        currLoaded: state.getSupportedCurrReduc.loaded,
        currError: state.getSupportedCurrReduc.error,
        exchanges: state.getExchReduc.exchanges,
        exchLoaded: state.getExchReduc.loaded,
        exchError: state.getExchReduc.error
    }
}

export default connect(mapStateToProps)(Tickers)