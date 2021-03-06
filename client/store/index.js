import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import mugs from './mugs'
import cart from './cart'
import tags from './tags'
import orders from './orders'
import filter from './filter'
import admin from './admin'

const reducer = combineReducers({user, mugs, cart, tags, orders, filter, admin})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './mugs'
export * from './cart'
export * from './tags'
export * from './orders'
export * from './filter'
export * from './admin'
