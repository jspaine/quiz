export default {
  fetching: state => state.ws.pending > 0,
  currentUser: state => state.user.name,
  allUsers: state => Object.keys(state.users),
  getUserAnswers: state => user => state.users[user],
  questions: state => state.questions,
  getQuestionAnswers: state => questionNum => state.questions[questionNum].answers,
  questionNum: state => state.game.question,
  started: state => state.game.started,
  finished: state => state.game.finished
}
