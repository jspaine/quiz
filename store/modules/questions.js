export default (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.state.questions
    case 'SET_QUESTIONS':
      return action.questions
    default: return state
  }
}
