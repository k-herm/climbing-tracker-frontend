import { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Paper,
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

import GradeSelect from '../../formComponents/gradeSelect'

const useStyles = makeStyles(theme => ({
  button: {
    padding: 0
  },
  container: {
    margin: `${theme.spacing(2)}px 0`
  }
}))

const createEmptyGoal = () => ({
  grade: '',
  numberClimbsToComplete: 1
})

const GoalTable = ({ goals, editable, setGoals }) => {
  const classes = useStyles()
  const [isError, setIsError] = useState(false)

  const isGradeInList = (grade) =>
    goals.some(goal => goal.grade === grade && !goal.isDeleted)

  const handleChange = (index, key, value) => {
    if (key === 'grade' && isGradeInList(value)) {
      setIsError(true)
      return
    }
    if (key === 'numberClimbsToComplete' && value <= 0) {
      return
    }
    setIsError(false)
    setGoals(prevState => {
      const state = [...prevState]
      state[index][key] = value
      return state
    })
  }

  const handleAdd = () => {
    setGoals([...goals, createEmptyGoal()])
  }

  const handleDelete = (i) => {
    setGoals(prevState => {
      const state = [...prevState]
      state[i].isDeleted = true
      return state
    })
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table size="small" aria-label="goals table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              Grade
            </TableCell>
            <TableCell align="left">
              # Routes to Complete
            </TableCell>
            <TableCell align="right">
              {editable &&
                <IconButton
                  className={classes.button}
                  color="primary"
                  aria-label="add goal"
                  component="span"
                  onClick={handleAdd}
                >
                  <AddCircleIcon />
                </IconButton>
              }
            </TableCell>
          </TableRow>
          {isError &&
            <TableRow>
              <TableCell colSpan="3">
                <Typography variant="caption" color="error" align='center'>
                  Oops! Cannot contain duplicate grade.
                </Typography>
              </TableCell>
            </TableRow>
          }
        </TableHead>

        <TableBody>
          {goals.map((goal, i) => !goal.isDeleted &&
            <TableRow key={i}>
              <TableCell>
                {editable
                  ?
                  <GradeSelect
                    noLabel
                    initialState={goal.grade}
                    updateState={e => handleChange(i, 'grade', e.target.value)}
                  />
                  : goal.grade
                }
              </TableCell>
              <TableCell>
                {editable
                  ?
                  <TextField
                    name="numberClimbsToComplete"
                    inputProps={{
                      'aria-label': 'numberClimbsToComplete',
                      'min': '1'
                    }}
                    value={goal.numberClimbsToComplete}
                    type="number"
                    onChange={e => handleChange(i, 'numberClimbsToComplete', e.target.value)}
                  />
                  : goal.numberClimbsToComplete
                }
              </TableCell>
              <TableCell align="right">
                {editable &&
                  <IconButton
                    className={classes.button}
                    aria-label="delete goal"
                    component="span"
                    onClick={() => handleDelete(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

GoalTable.propTypes = {
  goals: PropTypes.array,
  editable: PropTypes.bool,
  setGoals: PropTypes.func
}

GoalTable.defaultProps = {
  editable: true
}

export default GoalTable