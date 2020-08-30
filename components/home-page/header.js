import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 ${theme.spacing(1)}px`,
    '& button': {
      margin: theme.spacing(0.5),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
    },
    '& h5': {
      color: ({ isNavTransparent }) => !isNavTransparent && 'white'
    }
  }
}))

const Header = () => {
  const [isNavTransparent, setIsNavTransparent] = useState(true)

  const classes = useStyles({ isNavTransparent })
  const router = useRouter()

  const onLogin = () => router.push('/login')
  const onSignup = () => router.push('/login?signup=true')
  const setTransparent = () => {
    if (window.scrollY >= 70) {
      setIsNavTransparent(false)
    } else {
      setIsNavTransparent(true)
    }
  }

  useEffect(() => window.addEventListener('scroll', setTransparent), [])

  return (
    <AppBar color={isNavTransparent ? "transparent" : "primary"}>
      <Toolbar className={classes.appBar}>
        <Typography variant="h5" color="primary">
          iClimb-Tracker
        </Typography>
        <Box align="right">
          <Button
            variant="contained"
            color="primary"
            disableElevation={!isNavTransparent}
            onClick={onLogin}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation={!isNavTransparent}
            onClick={onSignup}
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header