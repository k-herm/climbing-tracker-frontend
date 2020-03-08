import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from '~/components/head';
import AuthProvider from './with-auth'

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'grid',
    // justifyItems: 'center',
    // maxWidth: '1500px',
  },
  copyright: {
    padding: theme.spacing(2)
  }
}))

const Copyright = () => {
  const classes = useStyles()
  return (
    <div className={classes.copyright}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © iClimb-Tracker '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  )
}

const Page = ({ children }) => {
  const classes = useStyles()
  return (
    <AuthProvider>
      <Head title='iClimb-Tracker' />
      <div className={classes.root}>
        {children}
      </div>
      <Copyright />
    </AuthProvider>
  )
}

export default Page

