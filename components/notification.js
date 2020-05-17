import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Snackbar, SnackbarContent, Typography } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: (props) => {
      if (props.severity === 'error')
        return theme.custom.error
      if (props.severity === 'warning')
        return theme.custom.warning
      if (props.severity === 'info')
        return theme.custom.info
      if (props.severity === 'success')
        return theme.custom.success
    },
    color: (props) => {
      if (props.severity === 'error')
        return theme.palette.error.dark
      if (props.severity === 'warning')
        return theme.palette.warning.dark
      if (props.severity === 'info')
        return theme.palette.info.dark
      if (props.severity === 'success')
        return theme.palette.success.dark
    },
    lineHeight: 1
  },
  message: {
    padding: 0
  }
}))

const Notification = ({
  id,
  duration = 4000,
  open,
  message,
  position = { vertical: 'top', horizontal: 'center' },
  severity
}) => {
  const props = { severity }
  const classes = useStyles(props)
  const { vertical, horizontal } = position
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    if (open) onOpen()
  }, [open])

  const Message = () =>
    <Grid container spacing={1} className={classes.message} wrap="nowrap">
      <Grid item>
        {severity === 'success' && <CheckCircleOutlineIcon />}
        {severity === 'info' && <InfoOutlinedIcon />}
        {severity === 'warning' && <ReportProblemOutlinedIcon />}
        {severity === 'error' && <ErrorOutlineOutlinedIcon />}
      </Grid>
      <Grid item>
        <Typography color={severity ? "textPrimary" : "inherit"}>
          {message}
        </Typography>
      </Grid>
    </Grid>

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={id}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={duration}
    >
      <SnackbarContent
        className={classes.snackbar}
        message={<Message />}
      />
    </Snackbar>
  )
}

Notification.propTypes = {
  id: PropTypes.string,
  duration: PropTypes.number,
  open: PropTypes.bool,
  message: PropTypes.string,
  position: PropTypes.object,
  severity: PropTypes.string
}

export default Notification