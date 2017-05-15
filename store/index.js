import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import wsMiddleware from './ws-middleware'

const isBrowser = typeof(window) !== 'undefined'
const composeEnhancers = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

/**
 * Create redux store
 */
export default (socket, state) => {
  const middleware = [wsMiddleware(socket, isBrowser), thunk]

  const enhancers = composeEnhancers(applyMiddleware(...middleware))

  const store = createStore(reducer, state, enhancers)

  if(module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
