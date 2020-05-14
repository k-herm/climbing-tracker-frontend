import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Header from '~/components/header'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fafafa'
  },
  transition: {
    duration: theme.transition.duration
  }
}));

const Transition = React.forwardRef((props, ref) =>
  <Slide direction="left" ref={ref} {...props} />
)

const PageModal = ({ children, open, onClose, title }) => {
  const classes = useStyles()
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      scroll="paper"
      TransitionComponent={Transition}
      transitionDuration={classes.transition.duration}
      PaperProps={{ className: classes.container }}
    >
      <Header title={title} arrowBack={true} onArrowBack={onClose} />
      {children}
    </Dialog>
  )
}

PageModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
}

export default PageModal