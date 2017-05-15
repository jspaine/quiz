import {v4} from 'uuid'

let pending = []

export default (socket, isBrowser) => store => {
  socket.on('action', action => {
    if (!isBrowser) return store.dispatch(action)

    if (pending.find(id => id === action.syncId)) {
      pending = pending.filter(id => id !== action.syncId)
      store.dispatch({type: 'ws/REMOVE_PENDING'})
    } else {
      delete action.sync
      delete action.syncId
      store.dispatch(action)
    }
  })

  return next => action => {
    if (action.sync) {
      if (isBrowser) {
        action.syncId = v4()
        pending.push(action.syncId)
        store.dispatch({type: 'ws/ADD_PENDING'})
      }

      socket.emit('action', action)
    }

    return next(action)
  }
}

export const ws = (state = {pending: 0}, action) => {
  switch (action.type) {
    case 'ws/ADD_PENDING':
    case 'ws/REMOVE_PENDING':
      return pending.length
    default: return state
  }
}
