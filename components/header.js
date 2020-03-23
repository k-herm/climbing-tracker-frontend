import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Slide,
  Typography,
  useScrollTrigger
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}))

const Header = ({ title }) => {
  const { titleStyle } = useStyles()
  const trigger = useScrollTrigger()
  return (
    // TODO - slider not working
    <Slide appear={false} direction='down' in={!trigger}>
      <AppBar position='static' color='secondary'>
        <Typography variant='h5' className={titleStyle}>
          {title}
        </Typography>
      </AppBar>
    </Slide>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header