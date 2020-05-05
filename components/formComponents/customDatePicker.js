import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    width: 265
  }
}))
const CustomDatePicker = ({ updateState, initialState }) => {
  const { container } = useStyles()
  const [state, setState] = useState(initialState)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <DatePicker
        className={container}
        id="date-picker"
        autoOk
        disableFuture
        margin="normal"
        label="Date completed"
        name="date"
        value={state}
        format="MMM do, yyyy"
        onChange={(value) => {
          setState(value)
          updateState(value)
        }}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

CustomDatePicker.propTypes = {
  initialState: PropTypes.string,
  updateState: PropTypes.func
}

export default CustomDatePicker