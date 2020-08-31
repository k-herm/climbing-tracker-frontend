import { useState, useContext } from 'react'
import Router from 'next/router'
import { TextField, Grid, Button, Typography, Link } from '@material-ui/core'

import FormContainer from '../form-components/form-container'
import Notification from '../notification'

import { UserContext } from '~/src/app/contexts/user-store'
import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'

const LoginForm = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [isResetNotification, setIsResetNotification] = useState(false)
  const { setUserData } = useContext(UserContext)

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onResetPassword = async () => {
    try {
      const url = `${getAPIBaseURL()}/password-recovery`
      await postRequest(url, { email: state.email })
      setIsResetNotification(true)
      setError('Check your email (and spam!) for a reset link.')
    }
    catch (error) {
      setError(error)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!state.email || !state.password)
        throw new Error('Please fill in email and password.')
      const url = `${getAPIBaseURL()}/login`
      const response = await postRequest(url, {
        email: state.email,
        password: state.password
      })
      if (response.userId) {
        setUserData(response.userId, response.userName)
        Router.push('/dashboard')
      }
    }
    catch (error) {
      setError(error)
    }
  }

  return (
    <FormContainer title="Login" >
      <Notification
        id="passwordReset"
        open={isResetNotification}
        message={`An email has been sent to ${state.email} to reset your password.
          Don't forget to check your spam!`}
        severity="success"
        duration={6000}
      />
      <form method='post' onSubmit={onSubmit}>
        {error &&
          <Grid item>
            <Typography color='error' align='center' paragraph={true}>
              {`${error}`}
            </Typography>
          </Grid>
        }
        <Grid item>
          <TextField
            required
            name="email"
            label="Email"
            inputProps={{ 'aria-label': 'email' }}
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            required
            name="password"
            label="Password"
            inputProps={{ 'aria-label': 'password' }}
            type="password"
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {error && !isResetNotification &&
          <Typography align="center">
            <Link href="#" onClick={onResetPassword}>
              Forgot your password?
            </Link>
          </Typography>
        }
        <Button
          variant="contained"
          color="secondary"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </FormContainer >

  )
}

export default LoginForm