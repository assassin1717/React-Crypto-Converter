import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Header, Icon, Input, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { API_URL } from '../api'
import { prepareCoinsList, formatCryptosList } from '../lib'

class MainCalculator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: [],
            converted: true,
            inputs: [0, "BTC", "ETH"]
        }

        this.setInputValue = this.setInputValue.bind(this)
        this.convertValue = this.convertValue.bind(this)
    }

    setInputValue(e) {
        const { inputs } = this.state
        let newValue = inputs
        newValue[0] = e.target.value
        this.setState({
            inputs: newValue
        })
    }

    setDropdownValue(e, position) {
        const { inputs } = this.state
        let newValue = inputs
        newValue[position] = e.target.children[0].innerHTML
        this.setState({
            inputs: newValue
        })
    }

    removeItemFromArray(array, item) {
        let newArray = array
        const index = newArray.indexOf(item)
        if (index > -1) {
            newArray.splice(index, 1)
        }
        return newArray
    }

    convertValue() {
        const { cryptos, parentHistory } = this.props
        const { inputs } = this.state
        let id = cryptos.data.find(x => x.symbol === inputs[2].toLowerCase()).id
        this.setState({
            converted: false
        })
        axios.get(API_URL + `/simple/price?ids=${id}&vs_currencies=${inputs[2].toLowerCase()}`)
            .then(resp => {
                const { data } = resp
                Object.keys(data[id]).forEach(key => {
                    parentHistory.unshift(`${inputs[0]} ${inputs[1]} is worth ${inputs[0] * data[id][key].toFixed(3)} ${inputs[2]}`)
                })
                this.setState({
                    converted: true
                })
            })
            .catch(err => {
                this.setState({
                    converted: false
                })
                console.log(err)
            })
    }

    render() {
        const { cryptos, currencies, cryptosLoaded, currLoaded, parentHistory } = this.props
        const { inputs } = this.state
        let firstDropOptions = [], secondDropOptions = []
        if (currLoaded && cryptosLoaded) {
            let cryptoAvailList=formatCryptosList(cryptos.data, currencies.data)
            firstDropOptions = prepareCoinsList(cryptoAvailList)
            secondDropOptions = prepareCoinsList(this.removeItemFromArray(cryptoAvailList, inputs[1]))
            return (
                <div id='main-body'>
                    <div id='container'>
                        <Header as='h1' color='blue'>Crypto Calculator</Header>
                        <br />
                        <table align='center'>
                            <tbody className="text-left">
                                <tr>
                                    <td colSpan='2'><Header as='h4' color='blue'>From:</Header></td>
                                    <td></td>
                                    <td colSpan='2'><Header as='h4' color='blue'>To:</Header></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input id="from" className='small-padding' size='huge' type='number' onChange={this.setInputValue} />
                                    </td>
                                    <td>
                                        <Dropdown className='small-padding resize-drop' size='huge' defaultValue={firstDropOptions[0].key} onChange={e => this.setDropdownValue(e, 1)} search selection options={firstDropOptions} />
                                    </td>
                                    <td>
                                        <Icon name='long arrow alternate right' size='big' />
                                    </td>
                                    <td>
                                        <Dropdown id="to" className='small-padding resize-drop' size='huge' defaultValue={secondDropOptions[0].key} onChange={e => this.setDropdownValue(e, 2)} search selection options={secondDropOptions} />
                                    </td>
                                    <td>
                                        <Button className='small-padding' primary size='huge' onClick={this.convertValue}>Convert</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <Header as='h4' color='blue'>Result</Header>
                        {parentHistory.length > 0 &&
                            Object.keys(parentHistory).map(key => {
                                if (key === '0') {
                                    return <Header key={key} as='h2' color='grey'>{parentHistory[key]}</Header>
                                }
                                else {
                                    return <Header key={key} as='h3' color='grey'>{parentHistory[key]}</Header>
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
        currError: state.getSupportedCurrReduc.error
    }
}

export default connect(mapStateToProps)(MainCalculator)