export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT':
      return action.state.users
    case 'ADD_USER':
      return {
        ...state,
        [action.name]: []
      }
    case 'ADD_ANSWER':
      return {
        ...state,
        [action.name]: [
          ...state[action.name].slice(0, action.index),
          action.answer,
          ...state[action.name].slice(action.index)
        ]
      }
    case 'RESET':
      return Object.assign(
        {},
        ...Object.keys(state).map(k => ({[k]: []}))
      )
    default: return state
  }
}
