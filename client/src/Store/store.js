import {createStore } from 'redux'
import RootReducers from './root-reducer'

const reduxStore = createStore(RootReducers)

export default reduxStore