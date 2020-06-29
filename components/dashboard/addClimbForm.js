import { useState, useEffect } from 'react'
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
import PitchesTable from '../formComponents/pitchesTable'
import ClimbStylesButtonGroup from '../formComponents/climbStyleButtonGroup'
import AttemptButtonGroup from '../formComponents/attemptButtonGroup'
import CustomDatePicker from '../formComponents/customDatePicker'
import ClimbStyleChipFilter from '../formComponents/climbStyleChipFilter'
import Notification from '../notification'

import { getDateString, formatGradeValue, reverseFormatGradeValue, getHigherGrade } from '~/src/app/utils'
import { ADD_CLIMB } from '~/src/app/Mutations/climb'
import { GET_NUMERIC_STATS, GET_GRADES_CHARTS, GET_CLIMBSTYLE_CHARTS } from '~/src/app/Queries/statistics'

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
  const { flexGroup, form, formControlCheck, textField } = useStyles()

  const [addClimb, { error: mutationError }] = useMutation(ADD_CLIMB, {
    refetchQueries: [
      'NumericStats',
      'GradesChart',
      'ClimbStyleChart'
    ],
    awaitRefetchQueries: true
  })

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
  const [isErrorNotification, setIsErrorNotification] = useState(false)

  useEffect(() => {
    if (mutationError) {
      setIsErrorNotification(true)
      setTimeout(() => setIsErrorNotification(false), 4000)
    }
  }, [mutationError])

  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      if (!state.pitches.length) {
        throw new Error('Looks like the grade or number of pitches is missing.')
      }

      const variables = { ...state }
      variables.date = getDateString(variables.date)
      variables.grade = reverseFormatGradeValue(variables.grade)
      variables.pitches = variables.pitches.map(pitch => ({
        grade: reverseFormatGradeValue(pitch.grade),
        numberPitches: Number.parseInt(pitch.numberPitches)
      }))

      addClimb({ variables })
      onClose()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <Notification
        id="addClimbError"
        open={isErrorNotification}
        message="There was an error saving your climb. Please try again"
        severity="error"
      />

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
            label="Date Completed"
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
        {error &&
          <Grid item>
            <Typography variant="caption" color="error" align="center">
              {`Oops! ${error}`}
            </Typography>
          </Grid>
        }
        <Grid item>
          <PitchesTable
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