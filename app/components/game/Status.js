import React from 'react'
import {connect} from 'react-redux'

import selectors from '../../../store/selectors'

const mapStateToProps = state => ({
  currentUser: selectors.currentUser(state),
  questionNum: selectors.questionNum(state),
  numQuestions: selectors.questions(state).length,
})

const Status = ({
  currentUser,
  questionNum,
  numQuestions,
}) =>
  <div>
    {`${currentUser}: ${questionNum + 1} / ${numQuestions}`}
  </div>

export default connect(mapStateToProps)(Status)
