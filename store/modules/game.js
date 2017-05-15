export default (state = {
  question: 0,
  started: true,
  finished: false
}, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return {
        ...state,
        question: state.question + 1
      }
    case 'PREV_QUESTION':
      return {
        ...state,
        question: state.question - 1
      }
    case 'RESET':
      return {
        question: 0,
        started: true,
        finished: false
      }
    case 'FINISH':
      return {
        ...state,
        finished: true
      }
    case 'START':
      return {
        ...state,
        started: true
      }
    default: return state
  }
}
