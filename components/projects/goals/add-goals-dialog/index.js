import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@material-ui/core'
import ConfirmDialog from '~/components/confirm-dialog'
import GoalTable from '../goal-table'
import { ADD_GOAL, EDIT_GOAL, DELETE_GOAL } from '~/src/app/mutations/project'
import { formatGradeValue } from '~/src/app/utils'
import * as actions from './actions'

const useStyles = makeStyles((theme) => ({
  widerDialog: {
    '& .MuiDialog-paper': {
      margin: theme.spacing(1)
    }
  },
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
  const widerDialog = useMediaQuery('(max-width: 420px)')

  const [addGoal] = useMutation(ADD_GOAL)
  const [editGoal] = useMutation(EDIT_GOAL)
  const [deleteGoal] = useMutation(DELETE_GOAL)

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isCustom, setIsCustom] = useState(projectData.goals.length ? projectData.goals[0].isCustom : true)
  const [error, setError] = useState(null)
  const [goals, setGoals] = useState([])

  useEffect(() => {
    if (projectData.goals.length) {
      setGoals(() => projectData.goals.map(goal => ({
        ...goal,
        grade: formatGradeValue(goal.grade)
      })))
    } else {
      setGoals([])
    }
  }, [projectData.goals])

  const onCloseConfirmDialog = () => setIsConfirmDialogOpen(false)
  const onConfirm = () => {
    if (goals.length) {
      actions.deleteAllGoals(projectData, goals, deleteGoal)
      setGoals([])
      setIsConfirmDialogOpen(false)
    }

    const buildPyramid = isCustom
    setIsCustom(!isCustom)

    if (buildPyramid) {
      actions.createPyramid(projectData, addGoal)
      onClose()
    }
  }

  const switchIsCustom = () => {
    if (goals.length) {
      setIsConfirmDialogOpen(true)
      return
    }
    onConfirm()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (goals.some(goal => goal.grade === '')) {
        throw new Error("Looks like you're missing some information.")
      }
      setError(null)
      actions.setGoalsMutations(
        projectData,
        goals,
        isCustom,
        [addGoal, editGoal, deleteGoal]
      )
      onClose()
    }
    catch (error) {
      setError(error)
    }
  }

  return (
    <>
      {!isConfirmDialogOpen ?
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="add-goal-dialog"
          maxWidth="sm"
          className={widerDialog ? classes.widerDialog : undefined}
        >
          <DialogTitle>Add Goals</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Having intermediate goals can help you achieve your project. Add custom goals or have them created for you.
            </DialogContentText>

            <Grid container justify="center">
              <Button
                className={classes.createButton}
                name="switchCustom"
                variant="contained"
                color="primary"
                onClick={switchIsCustom}
              >
                {isCustom ? 'Create Pyramid' : 'Set Custom Goals'}
              </Button>
            </Grid>

            {error &&
              <DialogContentText className={classes.errorMessage}>
                {`Oops! ${error}`}
              </DialogContentText>
            }
            <form method="post" onSubmit={onSubmit}>
              <Grid container justify="center">
                <GoalTable goals={goals} setGoals={setGoals} editable={isCustom} />
              </Grid>
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
        :
        <ConfirmDialog
          open={isConfirmDialogOpen}
          onClose={onCloseConfirmDialog}
          onConfirm={onConfirm}
          title="Delete All Current Goals"
          text={`Switching to ${
            isCustom ? `"create a pyramid"` : `"setting custom goals"`
            } will delete all existing goals. Are you sure want to delete?`
          }
          submitTitle="Delete"
        />
      }
    </>
  )
}

AddGoalsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  projectData: PropTypes.object,
}

export default AddGoalsDialog