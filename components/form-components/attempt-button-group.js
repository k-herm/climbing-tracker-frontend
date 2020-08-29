import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ButtonGroup,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonGroup: theme.buttonGroup
}))

const AttemptButtonGroup = ({ initialState, updateState }) => {
  const { buttonGroup } = useStyles()
  const [state, setState] = useState(initialState)
  return (
    <ButtonGroup className={buttonGroup} color="primary" aria-label="attempt button group">
      <Button
        name="attempt"
        variant={state === 'topRope' ? "contained" : "outlined"}
        onClick={() => {
          setState('topRope')
          updateState('topRope')
        }}
      >
        Top Rope
      </Button>
      <Button
        name="attempt"
        variant={state === 'redpoint' ? "contained" : "outlined"}
        onClick={() => {
          setState('redpoint')
          updateState('redpoint')
        }}
      >
        Redpoint
      </Button>
      <Button
        name="attempt"
        variant={state === 'onsight' ? "contained" : "outlined"}
        onClick={() => {
          setState('onsight')
          updateState('onsight')
        }}
      >
        Onsight
      </Button>
    </ButtonGroup>
  )
}

AttemptButtonGroup.propTypes = {
  initialState: PropTypes.string,
  updateState: PropTypes.func
}

export default AttemptButtonGroup