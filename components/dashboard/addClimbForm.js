import React from 'react'
import {
  Grid,
  TextField
} from '@material-ui/core'

const AddClimbForm = ({ onSubmit }) => {
  return (
    <form method="post" onSubmit={onSubmit}>
      <Grid item>
        <TextField
          required
          name="email"
          label="Email"
          inputProps={{ 'aria-label': 'email' }}
          // value={state.email}
          // onChange={handleChange}
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
          // value={state.password}
          // onChange={handleChange}
          fullWidth
        />
      </Grid>

    </form>
  )
}

export default AddClimbForm