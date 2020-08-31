import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { TextField, Grid, Button, Typography } from '@material-ui/core'

import { UserContext } from '~/src/app/contexts/user-store'
import FormContainer from '../form-components/form-container'
import { postRequest } from '~/src/request'
import { getAPIBaseURL } from '~/config'

const ResetForm = ({ resetToken }) => {
  const [state, setState] = useState({
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
        throw new Error('Please fill in all fields.')

      if (state.password !== state.passwordConfirm)
        throw new Error('Passwords do not match.')

      const url = `${getAPIBaseURL()}/password-reset`
      const response = await postRequest(url, {
        resetToken,
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
    <FormContainer title="Reset Password" >
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
            name="password"
            label="New Password"
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

ResetForm.propTypes = {
  resetToken: PropTypes.string
}

export default ResetForm