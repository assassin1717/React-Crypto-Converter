import axios from 'axios'
import {API_URL} from '../../api'

export const startGetCriptos = () => {
    return {
        type: 'START_GET_CRYPTOS',
        loaded: false,
        error: false
    }
}

export const getCryptosSuc = (cryptos) => {
    return{
        type: 'GET_CRYPTOS_SUCCESS',
        cryptos,
        loaded: true,
        error: false
    }
}

export const getCryptosFail = (cryptos) => {
    return{
        type: 'GET_CRYPTOS_FAIL',
        loaded: true,
        error: true
    }
}

export const getCryptos = () => {
    const url=`${API_URL}/coins/list`
    return dispatch => {
        dispatch(startGetCriptos())
        axios.get(url)
            .then((cryptos) => dispatch(getCryptosSuc(cryptos)))
            .catch((cryptos) => dispatch(getCryptosFail(cryptos)))
    }
}