import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  text,
  submitTitle
}) => (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete goals confirmation">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>
            Cancel
        </Button>
          <Button variant="contained" color="secondary" onClick={onConfirm}>
            {submitTitle}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
  submitTitle: PropTypes.string
}

export default ConfirmDialog