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
    maxWidth: ({ maxWidth }) => maxWidth || 265,
    margin: 0
  }
}))
const CustomDatePicker = ({ label, maxWidth, updateState, initialState }) => {
  const { container } = useStyles({ maxWidth })
  const [state, setState] = useState(initialState)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <DatePicker
        className={container}
        id="date-picker"
        autoOk
        disableFuture
        margin="normal"
        label={label}
        name="date"
        value={state}
        format="MMM do, yyyy"
        onChange={(value) => {
          setState(value)
          updateState(value)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  maxWidth: PropTypes.number,
  updateState: PropTypes.func
}

CustomDatePicker.defaultProps = {
  maxWidth: 265
}

export default CustomDatePicker