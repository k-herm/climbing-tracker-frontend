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
import { useMediaQuery } from '@material-ui/core'
import AttemptTable from './attemptTable'
import CondensedAttemptTable from './condensedAttemptTable'

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

const AddAttemptsDialog = ({ open, onClose, projectData }) => {
  const classes = useStyles()
  const widerDialog = useMediaQuery('(max-width: 420px)')
  const condenseTable = useMediaQuery('(max-width: 540px)')

  const [attempts, setAttempts] = useState([])
  // const [addGoal] = useMutation(ADD_GOAL)
  // const [editGoal] = useMutation(EDIT_GOAL)
  // const [deleteGoal] = useMutation(DELETE_GOAL)

  // const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // if (goals.some(goal => goal.grade === '')) {
      //   throw new Error("Looks like you're missing some information.")
      // }
      // setError(null)
      // actions.setGoalsMutations(
      //   projectData,
      //   goals,
      //   isCustom,
      //   [addGoal, editGoal, deleteGoal]
      // )
      onClose()
    }
    catch (error) {
      setError(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-attempt-dialog"
      maxWidth="sm"
      className={widerDialog ? classes.widerDialog : undefined}
    >
      <DialogTitle>Add Project Attempts</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Having intermediate goals can help you achieve your project. Add custom goals or have them created for you.
        </DialogContentText> */}


        {/* {error &&
              <DialogContentText className={classes.errorMessage}>
              {`Oops! ${error}`}
              </DialogContentText>
            } */}
        <form method="post" onSubmit={onSubmit}>
          <Grid container justify="center">
            {condenseTable
              ? <CondensedAttemptTable attempts={attempts} setAttempts={setAttempts} />
              : <AttemptTable attempts={attempts} setAttempts={setAttempts} />
            }
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
  )
}

AddAttemptsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  projectData: PropTypes.object,
}

export default AddAttemptsDialog