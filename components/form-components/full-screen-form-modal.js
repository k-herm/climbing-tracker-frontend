import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import FormContainer from './form-container'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  transition: {
    duration: theme.transition.duration
  }
}));

const Transition = React.forwardRef((props, ref) =>
  <Slide direction="up" ref={ref} {...props} />
)

const FullScreenFormModal = ({ formContent, appBarTitle, title, open, onClose }) => {
  const classes = useStyles()
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      scroll="paper"
      TransitionComponent={Transition}
      transitionDuration={classes.transition.duration}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm' disableGutters>
        <FormContainer title={title}>
          {formContent}
        </FormContainer>
      </Container>
    </Dialog>
  )
}

FullScreenFormModal.propTypes = {
  appBarTitle: PropTypes.string,
  formContent: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default FullScreenFormModal