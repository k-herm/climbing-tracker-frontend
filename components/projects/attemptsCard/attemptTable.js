import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import CustomDatePicker from '../../formComponents/customDatePicker'

const useStyles = makeStyles(theme => ({
  button: {
    padding: 0
  },
  container: {
    margin: `${theme.spacing(2)}px 0`
  }
}))

const createEmptyAttempt = () => ({
  date: new Date(),
  attemptType: 'Redpoint',
  numberOfAttempts: 1,
  send: false
})

const AttemptTable = ({ attempts, setAttempts }) => {
  const classes = useStyles()
  const [isError, setIsError] = useState(false)

  // const isDuplicate = () =>
  //   attempts.some(goal => goal.grade === grade && !goal.isDeleted)

  const handleChange = (index, key, value) => {
    // if (isDuplicate(value)) {
    //   setIsError(true)
    //   return
    // }
    // setIsError(false)
    setAttempts(prevState => {
      const state = [...prevState]
      state[index][key] = value
      return state
    })
  }

  const handleAdd = () => {
    setAttempts([...attempts, createEmptyAttempt()])
  }

  const handleDelete = (i) => {
    setAttempts(prevState => {
      const state = [...prevState]
      state.splice(i, 1)
      return state
    })
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table size="small" aria-label="attempts-table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              Attempt
            </TableCell>
            <TableCell align="left">
              # Attempts
            </TableCell>
            <TableCell align="left">
              Date
            </TableCell>
            <TableCell align="right">
              <IconButton
                className={classes.button}
                color="primary"
                aria-label="add goal"
                component="span"
                onClick={handleAdd}
              >
                <AddCircleIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {isError &&
            <TableRow>
              <TableCell colSpan="3">
                <Typography variant="caption" color="error" align='center'>
                  Oops! Cannot contain duplicate entries.
                </Typography>
              </TableCell>
            </TableRow>
          }
        </TableHead>

        <TableBody>
          {attempts.map((attempt, i) =>
            <TableRow key={i}>
              <TableCell>
                <Select
                  labelId="select-attempt-type"
                  value={attempt.attemptType}
                  name="attemptType"
                  onChange={e => handleChange(i, 'attemptType', e.target.value)}
                >
                  <MenuItem value="redpoint">Redpoint</MenuItem>
                  <MenuItem value="topRope">Top Rope</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  name="numberOfAttempts"
                  inputProps={{
                    'aria-label': 'numberOfAttempts',
                    'min': '1'
                  }}
                  value={attempt.numberOfAttempts}
                  type="number"
                  onChange={e => handleChange(i, 'numberOfAttempts', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <CustomDatePicker updateState={value => handleChange(i, 'date', value)} />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  className={classes.button}
                  aria-label="delete goal"
                  component="span"
                  onClick={() => handleDelete(i)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

AttemptTable.propTypes = {
  attempts: PropTypes.array,
  setattempts: PropTypes.func
}

// AttemptTable.defaultProps = {
//   editable: true
// }

export default AttemptTable