import { useState } from 'react'
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
import AttemptTable from './attempt-table'
import CondensedAttemptTable from './condensed-attempt-table'

import { getOptimisticResponseObject } from '~/src/app/mutations/cache'
import { ADD_ATTEMPT } from '~/src/app/mutations/project'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/queries/project-data'
import { getDateString } from '~/src/app/utils'

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

  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState([])
  const [addAttempt] = useMutation(ADD_ATTEMPT)

  const updateMutation = (cache, attempt) => {
    const projects = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
    const project = projects.projects.find(project => project._id === projectData._id)
    const newAttempt = project.attempts.find(a => a.attemptType === attempt.attemptType)
    if (!newAttempt) {
      project.attempts = [{
        __typename: 'AttemptTypes',
        attemptType: attempt.attemptType,
        count: 1,
        sendCount: 0
      }]
    }
    else {
      newAttempt.count += 1
    }

    cache.writeQuery({ query: GET_ALL_PROJECTS_DATA, data: projects })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      attempts.forEach(attempt => {
        const variables = {
          projectId: projectData._id,
          date: getDateString(attempt.date),
          attemptType: attempt.attemptType,
          send: attempt.send
        }

        for (let i = 0; i < attempt.numberOfAttempts; i++) {
          addAttempt({
            variables,
            update: (cache, { data }) => updateMutation(cache, attempt),
            optimisticResponse: getOptimisticResponseObject(
              'addAttempt',
              'Attempt',
              { _id: '1', ...variables }
            )
          })
        }
      })
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
        {error &&
          <DialogContentText className={classes.errorMessage}>
            {`Oops! ${error}`}
          </DialogContentText>
        }
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