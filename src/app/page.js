import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from '~/components/head';
import Nav from '~/components/nav';
import AuthProvider from './with-auth'
import { UserContext } from './Contexts/UserStore'

const useStyles = makeStyles((theme) => ({
  copyright: {
    fontSize: '10px'
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
  const isLogin = router.pathname === '/login'
  const { id, name } = useContext(UserContext)
  return (
    <AuthProvider>
      <Head title='iClimb-Tracker' />
      <Box className={main}>
        {children}
      </Box>
      <Grid className={footer} container direction="column">
        {id && name && <Nav redirect={isLogin ? '/dashboard' : null} />}
        <Copyright />
      </Grid>
    </AuthProvider>
  )
}

export default Page

