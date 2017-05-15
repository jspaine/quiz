import React from 'react'
import {connect} from 'react-redux'
import {withState, withHandlers, withPropsOnChange, compose} from 'recompose'

import selectors from '../../store/selectors'
import {registerUser, setUser} from '../../store/actions'

const mapStateToProps = state => ({
  allUsers: selectors.allUsers(state)
})

const mapDispatchToProps = dispatch => ({
  registerUser: user => () => dispatch(registerUser(user))
})

const Login = ({
  username,
  exists,
  onUsernameChange,
  onUsernameKeyUp,
  registerUser
}) =>
  <div>
    <label htmlFor="username">Name:</label>
    <input
      id="username"
      value={username}
      onChange={onUsernameChange}
      onKeyUp={onUsernameKeyUp}
      autoFocus
    />
    <button onClick={registerUser(username)}>
      Ok
    </button>
    {exists &&
      <div>exists</div>
    }
  </div>

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('username', 'handleUsernameChange', ''),
  withHandlers({
    onUsernameChange: props => ev => props.handleUsernameChange(ev.target.value),
    onUsernameKeyUp: props => ev => ev.keyCode === 13 && props.registerUser(props.username)()
  }),
  withPropsOnChange(
    ['allUsers', 'username'],
    props => ({
      ...props,
      exists: props.allUsers.find(name => name === props.username)
    })
  )
)(Login)
