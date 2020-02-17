import React, { useState, useContext } from 'react'
import router from 'next/router'
import { TextField, Grid, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import { UserContext } from '../../src/app/UserStore'
import FormContainer from '../FormContainer'
import { postRequest } from '../../src/request'
import { getAPIBaseURL } from '../../config'

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
      const url = `${getAPIBaseURL()}/login`
      const response = await postRequest(url, {
        email: state.email,
        password: state.password
      })
      if (response.userId) {
        setUser(response.userId, response.userName)
        router.push('/dashboard')
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
            <Typography color='error' align='center' paragraph='true'>
              {`${error}`}
            </Typography>
          </Grid>
        }
        <Grid item>
          <TextField
            required
            name="email"
            label="Email"
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