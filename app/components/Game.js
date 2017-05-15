import React from 'react'
import {connect} from 'react-redux'
import {withProps, compose} from 'recompose'

import selectors from '../../store/selectors'
import Status from './game/Status'
import AnswerButtons from './game/AnswerButtons'
import Controls from './game/Controls'

const mapStateToProps = state => ({
  currentUser: selectors.currentUser(state),
  questionNum: selectors.questionNum(state),
  getQuestion: num => selectors.questions(state)[num]
})

const mapDispatchToProps = dispatch => ({

})

const Game = ({
  currentUser,
  questionNum,
  question,
  answers
}) =>
  <div>
    <Status />
    {question}
    <AnswerButtons answers={answers} />
    {currentUser === 'admin' &&
      <Controls />
    }
  </div>

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    ...props,
    question: props.getQuestion(props.questionNum).question,
    answers: props.getQuestion(props.questionNum).answers
  }))
)(Game)
