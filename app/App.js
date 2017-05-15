import React from 'react'
import {connect} from 'react-redux'

import selectors from '../store/selectors'
import Login from './components/Login'
import Game from './components/Game'

const mapStateToProps = state => ({
  fetching: selectors.fetching(state),
  currentUser: selectors.currentUser(state)
})

const mapDispatchToProps = dispatch => ({

})

const App = ({fetching, currentUser}) =>
  <div>
    {!currentUser ?
      <Login /> :
      <Game />
    }
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(App)
