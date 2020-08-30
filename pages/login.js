import { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, Card, CardMedia, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LoginForm from '~/components/user/login-form'
import SignupForm from '~/components/user/signup-form'

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
      textAlign: 'center'
    }
  },
  link: {
    padding: theme.spacing(1),
    verticalAlign: 'middle'
  }
}))

const LoginPage = () => {
  const { container, media, link } = useStyles()
  const router = useRouter()
  const signupParam = router.query.signup
  const [isLogin, setIsLogin] = useState(!signupParam)

  const toggleLoginSignup = (e) => {
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  return (
    <CardMedia image="/climber.jpg" className={media}>
      <Grid
        className={container}
        container
        alignItems="center"
      >
        <Grid item sm={false} md={1} ><></></Grid>
        <Grid
          item
          xs={12} sm={6} md={4}
        >
          {isLogin ? <LoginForm /> : <SignupForm />}
          <Card>
            <Typography align="center" className={link}>
              {isLogin ? "Don't" : "Already"} have an account? {' '}
              <Link href="#" onClick={toggleLoginSignup}>
                {isLogin ? 'Sign up' : 'Login'}
              </Link>.
            </Typography>
          </Card>
        </Grid>
        <Grid
          container
          item
          justify="center"
          xs={12} sm={6} md={7}
        >
          <Typography variant="h1">iClimb-Tracker</Typography>
        </Grid>
      </Grid>
    </CardMedia>
  )
}

export default LoginPage