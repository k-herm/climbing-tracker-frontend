import { useState } from 'react'
import PropTypes from 'prop-types'
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

const useStyles = makeStyles((theme) => ({
  closeButton: {
    maxWidth: theme.button.maxWidth
  }
}))

const ClimbDataDialog = ({ open, onClose, data }) => {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="climbData-dialog">
      <DialogTitle>Completed Goal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Having intermediate goals can help you achieve your project. Add custom goals or have them created for you.
        </DialogContentText>

        <DialogActions>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

ClimbDataDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object
}

export default ClimbDataDialog