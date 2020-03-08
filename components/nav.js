import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded'
import BarChartIcon from '@material-ui/icons/BarChart';

const Nav = () => {
  const router = useRouter()
  const navItems = ['/dashboard', '/projects', '/journal']
  const currentIndex = navItems.indexOf(router.pathname)
  const [current, setCurrent] = useState(currentIndex);

  return (
    <BottomNavigation
      value={current}
      onChange={(event, newValue) => {
        setCurrent(newValue);
        router.push(navItems[newValue])
      }}
      showLabels
    >
      <BottomNavigationAction label="Dashboard" icon={<BarChartIcon />} />
      <BottomNavigationAction label="Projects" icon={<FormatListBulletedRoundedIcon />} />
      <BottomNavigationAction label="Journal" icon={<CreateIcon />} />
    </BottomNavigation>
  )
}

export default Nav;
