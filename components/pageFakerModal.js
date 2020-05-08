import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Slide } from '@material-ui/core'

import Header from '~/components/header'

const Transition = React.forwardRef((props, ref) =>
  <Slide direction="left" ref={ref} {...props} />
)

const PageFakerModal = ({ content, open, onClose, title }) =>
  <Dialog fullScreen open={open} onClose={onClose} scroll="paper" TransitionComponent={Transition}>
    <Header title={title} arrowBack={true} onArrowBack={onClose} />
    {content}
  </Dialog>

PageFakerModal.propTypes = {
  content: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
}

export default PageFakerModal