import React from 'react'
import {connect} from 'react-redux'

import selectors from '../../../store/selectors'
import {addAnswer} from '../../../store/actions'

const mapStateToProps = (state, ownProps) => ({
  currentUser: selectors.currentUser(state),
  questionNum: selectors.questionNum(state),
  answers: ownProps.answers
})

const mapDispatchToProps = dispatch => ({
  addAnswer: (username, questionNum, answerNum) =>
    dispatch(addAnswer(username, questionNum, answerNum))
})

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  addAnswer: answerNum => () => dispatchProps.addAnswer(
    stateProps.currentUser,
    stateProps.questionNum,
    answerNum
  )
})

const AnswerButtons = ({
  answers,
  addAnswer
}) =>
  <div>
    {answers.map((answer, i) =>
      <button
        key={i}
        onClick={addAnswer(i)}
      >
        {answer}
      </button>
    )}
  </div>

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AnswerButtons)
