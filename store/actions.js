export const init = state => ({type: 'INIT', state})

export const setUser = name => ({type: 'SET_USER', name})

const addUser = name => ({type: 'ADD_USER', name, sync: true})

export const registerUser = name => dispatch => {
  dispatch(setUser(name))
  dispatch(addUser(name))
}

export const nextQuestion = () => ({type: 'NEXT_QUESTION', sync: true})

export const previousQuestion = () => ({type: 'PREV_QUESTION', sync: true})

export const reset = () => ({type: 'RESET', sync: true})

export const start = () => ({type: 'START', sync: true})

export const finish = () => ({type: 'FINISH', sync: true})

export const setQuestions = questions => ({type: 'SET_QUESTIONS', questions})

export const addAnswer = (username, questionNum, answerNum) => ({
  type: 'ADD_ANSWER',
  sync: true,
  name: username,
  index: questionNum,
  answer: answerNum
})
