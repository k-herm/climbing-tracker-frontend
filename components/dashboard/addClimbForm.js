import React, { useState } from 'react'
import 'date-fns'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    '& button': {
      margin: '1rem 0',
      height: '40px'
    }
  },
  selectGroup: {
    margin: '0',
    minWidth: 140
  },
  flexGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

const AddClimbForm = ({ onSubmit }) => {
  const { buttonGroup, selectGroup, flexGroup } = useStyles()
  const [state, setState] = useState({
    name: null,
    location: null,
    date: new Date(),
    climbStyle: 'Trad',
    grade: null,
    send: false
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    console.log(state)
  }
  const handleClick = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
    console.log(state)
  }

  return (
    <form method="post" onSubmit={onSubmit}>
      <Grid item>
        <TextField
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
          name="location"
          label="Location"
          inputProps={{ 'aria-label': 'location' }}
          value={state.location}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id="date-picker"
            autoOk
            disableFuture
            margin="normal"
            label="Date completed"
            name="date"
            value={state.date}
            onChange={(value) => handleClick('date', value)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <ButtonGroup className={buttonGroup} color="primary" aria-label="climb style button group">
          <Button
            name="climbStyle"
            variant={state.climbStyle === 'Trad' ? "contained" : "outlined"}
            onClick={() => handleClick('climbStyle', 'Trad')}
          >
            Trad
          </Button>
          <Button
            name="climbStyle"
            variant={state.climbStyle === 'Trad' ? "outlined" : "contained"}
            onClick={() => handleClick('climbStyle', 'Sport')}
          >
            Sport
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Box className={flexGroup}>
          <FormControl className={selectGroup}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="select-grade"
              id="select-grade"
              value={state.grade}
              name="grade"
              onChange={handleChange}
              required
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="send"
                checked={state.send}
                onChange={() => handleClick('send', !state.send)}
                color="primary"
              />
            }
            labelPlacement="start"
            label="Send?"
          />
        </Box>
      </Grid>
    </form>
  )
}

// name
// location
// completed Date
// climb style
// grade
// attempt
// send
// pitches: [grade, numPitches]
// total length
// route style


export default AddClimbForm