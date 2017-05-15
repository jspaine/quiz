import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import io from 'socket.io-client'

import createStore from '../store/index'
import reducer from '../store/reducer'
import App from './App'
import 'font-awesome/css/font-awesome.css'

//disable redbox
delete AppContainer.prototype.unstable_handleError

const socket = io('http://localhost:4000')
const store = createStore(socket)

const root = document.getElementById('app')

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const Next = require('./App').default
    render(Next)
  })
}

render(App)
