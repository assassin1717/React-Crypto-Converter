const INITIAL_STATE = {
    cryptos: [],
    loaded: false,
    error: false
}

export default function search(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'START_GET_CRYPTOS':
            return {
                cryptos: [],
                loaded: false,
                error: false
            }
        case 'GET_CRYPTOS_SUCCESS':
            return {
                cryptos: action.cryptos,
                loaded: true,
                error: false
            }
        case 'GET_CRYPTOS_FAIL':
            return {
                loaded: true,
                error: true
            }
        default: return state
    }
}