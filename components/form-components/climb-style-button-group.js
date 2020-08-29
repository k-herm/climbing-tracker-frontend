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

const ClimbStylesButtonGroup = ({ initialState, updateState }) => {
  const { buttonGroup } = useStyles()
  const [state, setState] = useState(initialState)
  return (
    <ButtonGroup className={buttonGroup} color="primary" aria-label="climb style button group">
      <Button
        name="climbStyle"
        variant={state === 'trad' ? "contained" : "outlined"}
        onClick={() => {
          setState('trad')
          updateState('trad')
        }}
      >
        Trad
      </Button>
      <Button
        name="climbStyle"
        variant={state === 'sport' ? "contained" : "outlined"}
        onClick={() => {
          setState('sport')
          updateState('sport')
        }}
      >
        Sport
      </Button>
    </ButtonGroup>
  )
}

ClimbStylesButtonGroup.propTypes = {
  initialState: PropTypes.string,
  updateState: PropTypes.func
}

export default ClimbStylesButtonGroup