import express from 'express'
import compress from 'compression'
import http from 'http'
import socketIO from 'socket.io'
import {resolve} from 'path'
import {readFileSync, writeFileSync} from 'fs'

import createStore from '../store'
import {init, setQuestions} from '../store/actions'

const app = express()

app.use(compress({level: 9}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '..', 'dist')))
}

const server = http.createServer(app)
const io = socketIO(server)
const store = createStore(io)

const questions = readFileSync(resolve(__dirname, 'questions.json')).toString()
store.dispatch(setQuestions(JSON.parse(questions)))

server.listen(4000, () => {
  console.log('listening on 4000')
})

io.on('connection', function(socket){
  console.log('sending state to new client')
  socket.emit('action', init(store.getState()))

  socket.on('action', action => {
    console.log('dispatching action from client', action)
    store.dispatch(action)
    console.log('new state:', store.getState())
  })
});
