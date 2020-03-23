import React, { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab
} from '@material-ui/core'

import CreateIcon from '@material-ui/icons/Create'
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded'
import BarChartIcon from '@material-ui/icons/BarChart'
import AddIcon from '@material-ui/icons/Add'


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
  const navItems = ['/dashboard', '/projects', '/journal']

  const getIndex = (path) => navItems.indexOf(path)
  const initialIndex = redirect ? getIndex(redirect) : getIndex(router.pathname)

  const [current, setCurrent] = useState(initialIndex);

  const handleChange = async (event, newValue) => {
    setCurrent(newValue);
    router.push(navItems[newValue])
  }

  return (
    <BottomNavigation
      value={current}
      onChange={handleChange}
      showLabels
      className={nav}
    >
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
