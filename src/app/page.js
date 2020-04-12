import React from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Head from '~/components/head'
import Nav from '~/components/nav'
import AuthProvider from './with-auth'
import { useUserData } from '~/src/app/Hooks/userData'

const useStyles = makeStyles((theme) => ({
  copyright: {
    fontSize: '10px',
    backgroundColor: 'white'
  },
  footer: {
    position: 'fixed',
    bottom: 0
  },
  main: {
    height: '90vh'
  }
}))

const Copyright = () => {
  const { copyright } = useStyles()
  return (
    <Typography
      component="div"
      className={copyright}
      variant="caption"
      color="textSecondary"
      align="center"
    >
      {'Copyright © iClimb-Tracker '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Page = ({ children }) => {
  const { footer, main } = useStyles()
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'
  const { userId } = useUserData()
  return (
    <AuthProvider>
      <Head title='iClimb-Tracker' />
      <Box className={main}>
        {children}
      </Box>
      <Grid className={footer} container direction="column">
        {userId && !isLoginPage && <Nav redirect={isLoginPage ? '/dashboard' : null} />}
        <Copyright />
      </Grid>
    </AuthProvider>
  )
}

export default Page

