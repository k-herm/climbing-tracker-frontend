import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from '~/components/head';
import Nav from '~/components/nav';
import AuthProvider from './with-auth'
import { UserContext } from './UserStore'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '90vh'
  },
  copyright: {
    padding: theme.spacing(1),
  }
}))

const Copyright = () => {
  const { copyright } = useStyles()
  return (
    <Typography
      component="div"
      className={copyright}
      variant="body2"
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
  const { container } = useStyles()
  const router = useRouter()
  const isLogin = router.pathname === '/login'
  const { id, name } = useContext(UserContext)
  return (
    <AuthProvider>
      <Head title='iClimb-Tracker' />
      <Box className={container}>
        {children}
      </Box>
      {id && name && <Nav redirect={isLogin ? '/dashboard' : null} />}
      <Copyright />
    </AuthProvider>
  )
}

export default Page

