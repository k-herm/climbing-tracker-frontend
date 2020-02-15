import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LoginForm from '../components/user/login-form'
import { Grid, CardMedia } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh'
  },
  media: {
    padding: theme.spacing(),
    width: '100%',
    height: '100vh',
    '& h1': {
      color: 'white',
      fontSize: '50px',
      textAlign: 'center',
    }
  }
}))

const LoginPage = () => {
  const { container, media } = useStyles()
  return (
    <CardMedia image="/climber.jpg" className={media}>
      <Grid
        className={container}
        container
        alignItems="center"
        spacing={1}
      >
        <Grid item sm={false} md={1} ><></></Grid>
        <Grid
          item
          xs={12} sm={6} md={4}
        >
          <LoginForm />
        </Grid>
        <Grid
          container
          justify="center"
          item
          xs={12} sm={6} md={7}
        >
          <h1>iClimb-Tracker</h1>
        </Grid>
      </Grid>
    </CardMedia>
  )
}

export default LoginPage