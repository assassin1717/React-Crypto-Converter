import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Calculator from './calculator'
import Tickers from './tickers'
import { connect } from 'react-redux'
import { getCryptos } from '../store/actions/getCryptosActions'
import { getSuppCurr } from '../store/actions/getSupportedCurrActions'
import { getExchanges } from '../store/actions/getExchActions'


class BodyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            parentHistory: []
        }
    }

    componentDidMount() {
        this.props.getCryptos()
        this.props.getSuppCurr()
        this.props.getExchanges()
    }

    render() {
        return (
            <Routes>
                <Route exact path='/' element={<Calculator parentHistory={this.state.parentHistory} />} />
                <Route path='/tickers' element={<Tickers />} />
            </Routes>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCryptos: () => dispatch(getCryptos()),
        getSuppCurr: () => dispatch(getSuppCurr()),
        getExchanges: () => dispatch(getExchanges())
    }
}

export default connect(null, mapDispatchToProps)(BodyComponent)