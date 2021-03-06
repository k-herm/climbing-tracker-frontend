import { useState, useContext } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'

import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'
import { UserContext } from '~/src/app/contexts/user-store'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  titleStyle: {
    padding: theme.spacing(1)
  }
}))

const Header = ({ arrowBack, onArrowBack, title }) => {
  const { container, titleStyle } = useStyles()
  const { setUserData } = useContext(UserContext)
  const [anchorE1, setAnchorE1] = useState(null)

  const handleClick = (event) => setAnchorE1(event.currentTarget)
  const handleClose = (event) => setAnchorE1(null)
  const logout = async () => {
    try {
      handleClose()
      const logoutUrl = `${getAPIBaseURL()}/logout`
      await postRequest(logoutUrl)
      setUserData(null, null)
      Router.push('/login')
    } catch (error) {
      // TODO: display toast error message for logout
      console.log(error)
    }
  }

  return (
    <AppBar position='static' color='secondary'>
      <Toolbar className={container}>
        {arrowBack &&
          <IconButton
            edge='start'
            color='inherit'
            aria-label='back'
            onClick={onArrowBack}
          >
            <ArrowBackIcon />
          </IconButton>
        }
        <Typography variant='h5' className={titleStyle}>
          {title}
        </Typography>
        <IconButton
          edge='end'
          color='inherit'
          aria-label='menu'
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='settings'
          anchorEl={anchorE1}
          anchorOrigin={{
            vertical: 'bottom', horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top', horizontal: 'center'
          }}
          getContentAnchorEl={null}
          open={Boolean(anchorE1)}
          onClose={handleClose}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  arrowBack: PropTypes.bool,
  onArrowBack: PropTypes.func,
  title: PropTypes.string
}

export default Header