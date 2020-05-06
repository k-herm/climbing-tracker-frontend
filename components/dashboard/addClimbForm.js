import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GradeSelect from '../formComponents/gradeSelect'
import EditablePitchesTable from '../formComponents/editablePitchesTable'
import ClimbStylesButtonGroup from '../formComponents/climbStyleButtonGroup'
import AttemptButtonGroup from '../formComponents/attemptButtonGroup'
import CustomDatePicker from '../formComponents/customDatePicker'
import ClimbStyleChipFilter from '../formComponents/climbStyleChipFilter'

import { getDateString, reverseFormatGradeValue } from '~/src/app/utils'
import { ADD_CLIMB } from '~/src/app/Mutations/climb'

const useStyles = makeStyles(theme => ({
  flexGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 0.5rem'
    }
  },
  form: {
    width: '100%'
  },
  formControlCheck: {
    marginTop: theme.spacing(3)
  },
  textField: {
    maxWidth: 120
  }
}))

const AddClimbForm = ({ onClose }) => {
  const [addClimb] = useMutation(ADD_CLIMB)
  const { flexGroup, form, formControlCheck, textField } = useStyles()
  const [state, setState] = useState({
    name: '',
    location: '',
    date: new Date(),
    climbStyle: 'trad',
    attempt: 'topRope',
    grade: '',
    totalLength: 0,
    pitches: [],
    routeStyle: [],
    send: false
  })
  const [error, setError] = useState(null)

  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!state.grade || !state.pitches.length) {
        throw new Error('Please fill in the grade and pitches table.')
      }

      const variables = { ...state }
      variables.date = getDateString(variables.date)
      variables.grade = reverseFormatGradeValue(variables.grade)
      variables.pitches = variables.pitches.map(pitch => ({
        grade: reverseFormatGradeValue(pitch.grade),
        numberPitches: pitch.numberPitches
      }))

      addClimb({ variables })
      onClose()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      {error &&
        <Typography variant="caption" color="error" align="center">
          {`Oops! ${error}`}
        </Typography>
      }
      <form method="post" onSubmit={onSubmit} className={form}>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            inputProps={{ 'aria-label': 'name' }}
            value={state.name}
            onChange={e => handleClick('name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            name="location"
            label="Location"
            inputProps={{ 'aria-label': 'location' }}
            value={state.location}
            onChange={e => handleClick('location', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <CustomDatePicker
            initialState={state.date}
            updateState={(value) => handleClick('date', new Date(value))}
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
                handleClick('grade', e.target.value)
                handleClick('pitches', [{ grade: e.target.value, numberPitches: 1 }])
              }}
            />
            <TextField
              name="totalLength"
              label="Total Length(m)"
              inputProps={{ 'aria-label': 'totalLength' }}
              value={state.totalLength}
              type="number"
              onChange={e =>
                e.target.value > 0 &&
                handleClick('totalLength', Number.parseInt(e.target.value))
              }
              className={textField}
            />
            <FormControlLabel
              className={formControlCheck}
              control={
                <Checkbox
                  name="send"
                  checked={state.send}
                  onChange={() => handleClick('send', !state.send)}
                  color="primary"
                />
              }
              labelPlacement="start"
              label="Send it?"
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
        <Grid item>
          <ClimbStyleChipFilter updateState={(value) => handleClick('routeStyle', value)} />
        </Grid>

        <Button variant="contained" color="secondary" type="submit">
          Save
      </Button>
      </form >
    </>
  )
}

AddClimbForm.propTypes = {
  onClose: PropTypes.func
}

export default AddClimbForm