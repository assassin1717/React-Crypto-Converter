import axios from 'axios'
import {API_URL} from '../../api'

export const startGetSuppCurr = () => {
    return {
        type: 'START_GET_SUPPORTED_CURR',
        loaded: false,
        error: false
    }
}

export const getSuppCurrSuc = (currencies) => {
    return{
        type: 'GET_SUPPORTED_CURR_SUCCESS',
        currencies,
        loaded: true,
        error: false
    }
}

export const getSuppCurrFail = (currencies) => {
    return{
        type: 'GET_SUPPORTED_CURR_FAIL',
        loaded: true,
        error: true
    }
}

export const getSuppCurr = () => {
    const url=`${API_URL}/simple/supported_vs_currencies`
    return dispatch => {
        dispatch(startGetSuppCurr())
        axios.get(url)
            .then((currencies) => dispatch(getSuppCurrSuc(currencies)))
            .catch((currencies) => dispatch(getSuppCurrFail(currencies)))
    }
}