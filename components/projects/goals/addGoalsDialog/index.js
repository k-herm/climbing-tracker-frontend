import { useState, useEffect, useContext } from 'react'
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
import ConfirmDialog from '~/components/confirmDialog'
import GoalTable from '../goalTable'

import { ADD_GOAL, EDIT_GOAL, DELETE_GOAL } from '~/src/app/Mutations/project'
import * as actions from './actions'
import { useProjects } from '~/src/app/Hooks/useProjects'
import { ProjectsContext } from '~/src/app/Contexts/ProjectsStore'

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
  const [state] = useContext(ProjectsContext)
  const projectIndex = state.projects.findIndex(project => project._id === projectData._id)

  const [goals, setGoals] = useState([])
  const { getGoals, addGoal: addGoalToState, clearGoals } = useProjects()

  useEffect(() => {
    setGoals(state.projects[projectIndex].goals)
  }, [state.projects[projectIndex].goals])

  const [addGoal] = useMutation(ADD_GOAL)
  const [editGoal] = useMutation(EDIT_GOAL)
  const [deleteGoal] = useMutation(DELETE_GOAL)

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isCustom, setIsCustom] = useState(goals.length ? goals[0].isCustom : true)
  const [error, setError] = useState(null)

  const onCloseConfirmDialog = () => setIsConfirmDialogOpen(false)
  const onConfirm = () => {
    if (goals.length) {
      actions.deleteAllGoals(goals, deleteGoal)
      clearGoals(projectData._id)
      setIsConfirmDialogOpen(false)
    }

    const buildPyramid = isCustom
    setIsCustom(!isCustom)

    if (buildPyramid) {
      actions.createPyramid(
        projectData,
        addGoal,
        addGoalToState
      )
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
      if (!goals.length || goals.some(goal => goal.grade === '')) {
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
        <Dialog open={open} onClose={onClose} aria-labelledby="add-goal-dialog">
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
              <GoalTable projectId={projectData._id} />
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