import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@material-ui/core'

import GoalTable from './goalTable'
import { ADD_GOAL } from '~/src/app/Mutations/project'
import { formatGradeValue, reverseFormatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  createButton: {
    maxWidth: theme.button.maxWidth
  },
  errorMessage: {
    margin: theme.spacing(2),
    color: theme.palette.error.main,
    textAlign: 'center'
  }
}))

const AddGoalsDialog = ({ open, onClose, projectData }) => {
  const classes = useStyles()
  const [addGoal] = useMutation(ADD_GOAL)
  const [error, setError] = useState(null)
  const [goals, setGoals] = useState(() => {
    if (projectData.goals.length) {
      return projectData.goals.map(goal => ({
        ...goal,
        grade: formatGradeValue(goal.grade)
      }))
    }
    return []
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!goals.length || goals.some(goal => goal.grade === '')) {
        throw new Error("Looks like you're missing some information.")
      }
      setError(null)

      goals.forEach(goal => {
        const variables = {
          projectId: projectData._id,
          grade: reverseFormatGradeValue(goal.grade),
          numberClimbsToComplete: Number.parseInt(goal.numberClimbsToComplete)
        }
        addGoal({ variables })
      })
      onClose()
    }
    catch (error) {
      setError(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-goal-dialog">
      <DialogTitle>Add Goals</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Having intermediate goals can help you achieve your project. Add custom goals or have them created for you.
        </DialogContentText>

        <Grid container justify="center">
          <Button
            className={classes.createButton}
            name="createPyramid"
            variant="contained"
            color="primary"
            onClick={() => { }}
          >
            Create Pyramid
          </Button>
        </Grid>

        {error &&
          <DialogContentText className={classes.errorMessage}>
            {`Oops! ${error}`}
          </DialogContentText>
        }
        <form method="post" onSubmit={onSubmit}>
          <GoalTable currentGoals={goals} setCurrentGoals={setGoals} />
          <DialogActions>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

AddGoalsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  projectData: PropTypes.object
}

export default AddGoalsDialog