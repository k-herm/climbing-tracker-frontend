import React, { useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import FormContainer from '../FormContainer'

const LoginForm = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <FormContainer
      title="Login"
      submitTitle="Continue"
    >
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
    </FormContainer>

  )
}

export default LoginForm