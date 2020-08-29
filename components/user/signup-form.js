import { useState, useContext } from 'react'
import Router from 'next/router'
import { TextField, Grid, Button, Typography } from '@material-ui/core'

import { UserContext } from '~/src/app/contexts/user-store'
import FormContainer from '../form-components/form-container'
import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'

const SignupForm = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [error, setError] = useState(null)
  const { setUserData } = useContext(UserContext)

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!Object.values(state).every(key => key))
        throw new Error('Please fill in name, email and password.')
      const url = `${getAPIBaseURL()}/register`
      const response = await postRequest(url, {
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirm: state.passwordConfirm
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
    <FormContainer title="Signup" >
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
            name="name"
            label="Name"
            inputProps={{ 'aria-label': 'name' }}
            value={state.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
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
        <Grid item>
          <TextField
            required
            name="passwordConfirm"
            label="Confirm Password"
            inputProps={{ 'aria-label': 'passwordConfirm' }}
            type="password"
            value={state.passwordConfirm}
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

export default SignupForm