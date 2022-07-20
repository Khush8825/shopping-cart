import {combineReducers} from 'redux'
import CartReducer from './Reducers/CartReducer'
import userReducer from './Reducers/UserReducer';

const RootReducers = combineReducers({CartReducer: CartReducer, user:userReducer})

export default RootReducers;