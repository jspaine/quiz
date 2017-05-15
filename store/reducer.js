import {combineReducers} from 'redux'

import game from './modules/game'
import questions from './modules/questions'
import users from './modules/users'
import user from './modules/user'
import {ws} from './ws-middleware'

export default combineReducers({
  game,
  user,
  users,
  questions,
  ws
})
