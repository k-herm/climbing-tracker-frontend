import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { GRADES } from '~/src/app/constants'

const useStyles = makeStyles({
  selectGroup: {
    margin: '0',
    minWidth: 120,
  },
})

const GradeSelect = ({ updateState, initialState, noLabel }) => {
  const { selectGroup } = useStyles()
  const [state, setState] = useState(initialState)
  return (
    <FormControl className={selectGroup}>
      {!noLabel && <InputLabel id="select-grade">Grade</InputLabel>}
      <Select
        labelId="select-grade"
        id="select-grade"
        value={state}
        name="grade"
        onChange={e => {
          setState(e.target.value)
          updateState(e)
        }}
        required
      >
        {GRADES.map((grade, i) =>
          <MenuItem value={grade} key={i}>{grade}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

GradeSelect.propTypes = {
  initialState: PropTypes.string,
  updateState: PropTypes.func,
  noLabel: PropTypes.bool
}

GradeSelect.defaultProps = {
  noLabel: false
}

export default GradeSelect