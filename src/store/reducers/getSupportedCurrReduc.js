const INITIAL_STATE = {
    currencies: [],
    loaded: false,
    error: false
}

export default function search(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'START_GET_SUPPORTED_CURR':
            return {
                currencies: [],
                loaded: false,
                error: false
            }
        case 'GET_SUPPORTED_CURR_SUCCESS':
            return {
                currencies: action.currencies,
                loaded: true,
                error: false
            }
        case 'GET_SUPPORTED_CURR_FAIL':
            return {
                loaded: true,
                error: true
            }
        default: return state
    }
}