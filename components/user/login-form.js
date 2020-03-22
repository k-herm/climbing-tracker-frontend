import React, { useState, useContext } from 'react'
import Router from 'next/router'
import { TextField, Grid, Button, Typography } from '@material-ui/core'

import { UserContext } from '~/src/app/Contexts/UserStore'
import FormContainer from '../formContainer'
import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'

const LoginForm = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const { setUser } = useContext(UserContext)

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
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
        setUser(response.userId, response.userName)
        Router.push('/dashboard')
      }
    }
    catch (error) {
      setError(error)
    }
  }

  return (
    <FormContainer title="Login" >
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
        <Button
          variant="contained"
          color="secondary"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </FormContainer>

  )
}

export default LoginForm