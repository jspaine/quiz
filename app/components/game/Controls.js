import React from 'react'
import {connect} from 'react-redux'

import selectors from '../../../store/selectors'
import {
  nextQuestion,
  previousQuestion,
  start,
  reset,
  finish
} from '../../../store/actions'

const mapStateToProps = state => ({
  questionNum: selectors.questionNum(state),
  numQuestions: selectors.questions(state).length
})

const mapDispatchToProps = dispatch => ({
  nextQuestion: () => dispatch(nextQuestion()),
  previousQuestion: () => dispatch(previousQuestion()),
  start: () => dispatch(start()),
  reset: () => {
    if (confirm('Really reset?'))
      dispatch(reset())
  },
  finish: () => dispatch(finish())
})

const Controls = ({
  questionNum,
  numQuestions,
  nextQuestion,
  previousQuestion,
  reset,
  finish
}) =>
  <div>
    <div>
      <button
        onClick={previousQuestion}
        disabled={questionNum === 0}
      >
        Back
      </button>
      {questionNum >= numQuestions - 1 ?
        <button onClick={finish}>Finish</button> :
        <button onClick={nextQuestion}>Next</button>
      }

    </div>
    <button onClick={reset}>Reset</button>
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
