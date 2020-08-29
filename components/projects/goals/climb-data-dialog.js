import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(2)}px 0`
  }
}))

const ClimbDataDialog = ({ open, onClose, data }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="climbData-dialog">
      <DialogTitle>Completed Goal!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You're one step closer to sending your project 🎉
        </DialogContentText>
        <Card className={classes.card}>
          <CardContent>
            <Typography color="primary" variant="h6">{data.name}</Typography>
            <Typography>{data.grade}</Typography>
            <Typography>{new Date(data.completedDate).toDateString()}</Typography>
          </CardContent>
        </Card>
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