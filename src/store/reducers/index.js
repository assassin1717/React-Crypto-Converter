import { combineReducers } from 'redux'
import getCryptosReduc from './getCryptosReduc'
import getSupportedCurrReduc from './getSupportedCurrReduc'
import getExchReduc from './getExchReduc'

const rootReducer = combineReducers({
    getCryptosReduc,
    getSupportedCurrReduc,
    getExchReduc
})

export default rootReducer