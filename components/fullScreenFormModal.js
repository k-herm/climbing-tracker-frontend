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

import FormContainer from './formContainer'
import AddClimbForm from './dashboard/addClimbForm'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef((props, ref) =>
  <Slide direction="up" ref={ref} {...props} />
)

const FullScreenFormModal = ({ addItem, open, onClose }) => {
  const classes = useStyles()
  const [item, setItem] = useState(null)

  useEffect(() => {
    switch (addItem) {
      case 'dashboard': return setItem('climb')
      case 'projects': return setItem('project')
      case 'journal': return setItem('journal entry')
      default: return setItem(null)
    }
  }, [addItem])

  const formPicker = {
    dashboard: <AddClimbForm />,
  }

  return (
    <Dialog fullScreen open={open} onClose={onClose} scroll="paper" TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <FormContainer title={`Enter a ${item}`}>
          {formPicker[addItem]}
        </FormContainer>
      </Container>
    </Dialog>
  )
}

FullScreenFormModal.propTypes = {
  addItem: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default FullScreenFormModal