import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import Header from '~/components/header'

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   position: 'relative',
  // },
  // title: {
  //   marginLeft: theme.spacing(2),
  //   flex: 1,
  // },
}));

const Transition = React.forwardRef((props, ref) =>
  <Slide direction="left" ref={ref} {...props} />
)

const PageFakerModal = ({ open, onClose, projectData }) => {
  // const classes = useStyles()
  console.log(projectData);
  return (
    <Dialog fullScreen open={open} onClose={onClose} scroll="paper" TransitionComponent={Transition}>
      {projectData &&
        <>
          <Header title={projectData.name} arrowBack={true} onArrowBack={onClose} />
        </>
      }
    </Dialog>
  )
}

PageFakerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  projectData: PropTypes.object
}

export default PageFakerModal