import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
import EditableTable from '../editableTable'
import { GRADES } from '~/src/app/constants'
import { reverseFormatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    '& button': {
      margin: '1rem 0',
      height: '40px',
      lineHeight: 1.2
    }
  },
  selectGroup: {
    margin: '0',
    minWidth: 120,
  },
  flexGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  form: {
    width: '100%'
  },
  textField: {
    maxWidth: 120
  }
}))

const AddClimbForm = ({ onSubmit }) => {
  const { buttonGroup, selectGroup, flexGroup, form, textField } = useStyles()
  const [state, setState] = useState({
    name: null,
    location: null,
    date: new Date(),
    climbStyle: 'trad',
    attempt: 'topRope',
    grade: '',
    totalLength: 0,
    pitches: [],
    send: false
  })

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(state)
  }
  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(state)
  }

  //on submit - use reverseFormatGradeValue
  //check state.pitches is not empty

  return (
    <form method="post" onSubmit={onSubmit} className={form}>
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
            format="MMM do, yyyy"
            onChange={(value) => handleClick('date', value)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item>
        <Box className={flexGroup}>
          <ButtonGroup className={buttonGroup} color="primary" aria-label="climb style button group">
            <Button
              name="climbStyle"
              variant={state.climbStyle === 'trad' ? "contained" : "outlined"}
              onClick={() => handleClick('climbStyle', 'trad')}
            >
              Trad
            </Button>
            <Button
              name="climbStyle"
              variant={state.climbStyle === 'sport' ? "contained" : "outlined"}
              onClick={() => handleClick('climbStyle', 'sport')}
            >
              Sport
            </Button>
          </ButtonGroup>
          <ButtonGroup className={buttonGroup} color="primary" aria-label="attempt button group">
            <Button
              name="attempt"
              variant={state.attempt === 'topRope' ? "contained" : "outlined"}
              onClick={() => handleClick('attempt', 'topRope')}
            >
              Top Rope
            </Button>
            <Button
              name="attempt"
              variant={state.attempt === 'redpoint' ? "contained" : "outlined"}
              onClick={() => handleClick('attempt', 'redpoint')}
            >
              Redpoint
            </Button>
            <Button
              name="attempt"
              variant={state.attempt === 'onsight' ? "contained" : "outlined"}
              onClick={() => handleClick('attempt', 'onsight')}
            >
              Onsight
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid item>
        <Box className={flexGroup}>
          <FormControl className={selectGroup}>
            <InputLabel id="select-grade">Grade</InputLabel>
            <Select
              labelId="select-grade"
              id="select-grade"
              value={state.grade}
              name="grade"
              onChange={e => {
                handleChange(e)
                handleClick('pitches', [{ grade: e.target.value, numberPitches: 1 }])
              }}
              required
            >
              {GRADES.map(grade =>
                <MenuItem value={grade}>{grade}</MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            name="totalLength"
            label="Total Length(m)"
            inputProps={{ 'aria-label': 'totalLength' }}
            value={state.totalLength}
            type="number"
            onChange={handleChange}
            className={textField}
          />
        </Box>
      </Grid>
      <Grid item>
        <EditableTable
          columnHeaders={['Grade', '#Pitches']}
          rowData={state.pitches}
          saveData={(data) => handleClick('pitches', data)}
        />
      </Grid>
      {/* <FormControlLabel
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
          /> */}
    </form>
  )
}


// pitches: [grade, numPitches]
// route style

AddClimbForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddClimbForm