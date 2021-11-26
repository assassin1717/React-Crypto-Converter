import axios from 'axios'
import {API_URL} from '../../api'

export const startGetExchanges = () => {
    return {
        type: 'START_GET_EXCHANGES',
        loaded: false,
        error: false
    }
}

export const getExchangesSuc = (exchanges) => {
    return{
        type: 'GET_EXCHANGES_SUCCESS',
        exchanges,
        loaded: true,
        error: false
    }
}

export const getExchangesFail = () => {
    return{
        type: 'GET_EXCHANGES_FAIL',
        loaded: true,
        error: true
    }
}

export const getExchanges = () => {
    const url=`${API_URL}/exchanges/list`
    return dispatch => {
        dispatch(startGetExchanges())
        axios.get(url)
            .then((exchanges) => dispatch(getExchangesSuc(exchanges)))
            .catch(() => dispatch(getExchangesFail()))
    }
}