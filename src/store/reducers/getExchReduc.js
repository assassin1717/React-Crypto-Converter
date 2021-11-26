const INITIAL_STATE = {
    exchanges: [],
    loaded: false,
    error: false
}

export default function search(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'START_GET_EXCHANGES':
            return {
                exchanges: [],
                loaded: false,
                error: false
            }
        case 'GET_EXCHANGES_SUCCESS':
            return {
                exchanges: action.exchanges,
                loaded: true,
                error: false
            }
        case 'GET_EXCHANGES_FAIL':
            return {
                loaded: true,
                error: true
            }
        default: return state
    }
}