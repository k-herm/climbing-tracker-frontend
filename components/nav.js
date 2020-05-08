import React, { useState, useEffect } from 'react'
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
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleChange = async (event, newValue) => {
    setCurrentIndex(newValue);
    router.push(navItems[newValue])
  }

  return (
    <BottomNavigation
      value={currentIndex}
      onChange={handleChange}
      showLabels
      className={nav}
    >
      <BottomNavigationAction label="Dashboard" icon={<BarChartIcon />} />
      <BottomNavigationAction label="Projects" icon={<FormatListBulletedRoundedIcon />} />
      <BottomNavigationAction label="Journal" icon={<CreateIcon />} />
      {navItems[currentIndex] &&
        <Fab aria-label="add" color="primary" className={floatingIcon}>
          <AddIcon fontSize="large" onClick={() => {
            setCurrentIndex(-1)
            router.push(`${navItems[currentIndex]}/add`)
          }} />
        </Fab>
      }
    </BottomNavigation>
  )
}

Nav.propTypes = {
  redirect: PropTypes.string
}

export default Nav;
