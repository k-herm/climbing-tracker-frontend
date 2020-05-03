import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Grid,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GradeSelect from '../formComponents/gradeSelect'
import EditablePitchesTable from '../formComponents/editablePitchesTable'
import ClimbStylesButtonGroup from '../formComponents/climbStyleButtonGroup'
import AttemptButtonGroup from '../formComponents/attemptButtonGroup'
import CustomDatePicker from '../formComponents/customDatePicker'

import { reverseFormatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles(theme => ({
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
  const { flexGroup, form, textField } = useStyles()
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
        <CustomDatePicker
          initialState={state.date}
          updateState={(value) => handleClick('date', value)}
        />
      </Grid>
      <Grid item>
        <Box className={flexGroup}>
          <ClimbStylesButtonGroup
            initialState={state.climbStyle}
            updateState={(value) => handleClick('climbStyle', value)}
          />
          <AttemptButtonGroup
            initialState={state.attempt}
            updateState={(value) => handleClick('attempt', value)}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box className={flexGroup}>
          <GradeSelect
            initialState={state.grade}
            updateState={(e) => {
              handleChange(e)
              handleClick('pitches', [{ grade: e.target.value, numberPitches: 1 }])
            }}
          />
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
        <EditablePitchesTable
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
    </form >
  )
}


// route style

AddClimbForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddClimbForm