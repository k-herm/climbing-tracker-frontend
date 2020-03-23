import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab
} from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CreateIcon from '@material-ui/icons/Create'
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded'
import BarChartIcon from '@material-ui/icons/BarChart'
import AddIcon from '@material-ui/icons/Add'

import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'
import { UserContext } from '~src/app/Contexts/UserStore'

const useStyles = makeStyles((theme) => ({
  floatingIcon: {
    position: 'absolute',
    zIndex: 1,
    bottom: 80,
    right: '1.5rem'
  },
  nav: {
    borderTop: '1px solid lightgrey'
  }
}))

const Nav = ({ redirect }) => {
  const { floatingIcon, nav } = useStyles()

  const router = useRouter()
  const navItems = ['/login', '/dashboard', '/projects', '/journal']

  const getIndex = (path) => navItems.indexOf(path)
  const initialIndex = redirect ? getIndex(redirect) : getIndex(router.pathname)

  const [current, setCurrent] = useState(initialIndex);
  const [shouldRoute, setShouldRoute] = useState(true)
  const { setUser } = useContext(UserContext)

  const logout = async () => {
    try {
      const logoutUrl = `${getAPIBaseURL()}/logout`
      await postRequest(logoutUrl)
      setUser(null, null)
      setShouldRoute(true)
    } catch (error) {
      // TODO: display toast error message for logout
      console.log(error)
      setShouldRoute(false)
    }
  }

  const handleChange = async (event, newValue) => {
    if (newValue === 0) {
      await logout()
    }
    if (shouldRoute) {
      setCurrent(newValue);
      router.push(navItems[newValue])
    }
  }

  return (
    <BottomNavigation
      value={current}
      onChange={handleChange}
      showLabels
      className={nav}
    >
      <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} />
      <BottomNavigationAction label="Dashboard" icon={<BarChartIcon />} />
      <BottomNavigationAction label="Projects" icon={<FormatListBulletedRoundedIcon />} />
      <BottomNavigationAction label="Journal" icon={<CreateIcon />} />
      <Fab aria-label="add" color="primary" className={floatingIcon}>
        <AddIcon fontSize="large" />
      </Fab>
    </BottomNavigation>
  )
}

Nav.propTypes = {
  redirect: PropTypes.string
}

export default Nav;
