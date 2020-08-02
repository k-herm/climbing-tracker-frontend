import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: `${theme.spacing(1)}px`,
    '& > button': {
      padding: theme.spacing(1.5)
    }
  },
  flexGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 0.5rem'
    }
  },
  center: {
    justifyContent: 'center'
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

const AddClimbComponents = ({
  isProject,
  state,
  updateField,
  onSubmit,
  mutationError,
  onClose
}) => {
  const classes = useStyles()
  const [error, setError] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)

  useEffect(() => {
    if (mutationError) {
      setIsErrorNotification(true)
      setTimeout(() => setIsErrorNotification(false), 4000)
    }
  }, [mutationError])

  const handleClick = (name, value) => {
    updateField(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!state.pitches.length) {
      setError('Looks like the grade or number of pitches is missing.')
      return
    }
    onSubmit()
    onClose()
  }

  return (
    <>
      <Notification
        id="addClimbError"
        open={isErrorNotification}
        message="Uh oh. There was an error saving. Please try again."
        severity="error"
      />

      <form method="post" onSubmit={handleSubmit} className={classes.form}>
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
        {!isProject &&
          <Grid item>
            <CustomDatePicker
              label="Date Completed"
              initialState={state.date}
              updateState={(value) => handleClick('date', value)}
            />
          </Grid>
        }
        <Grid item>
          <Box className={`${classes.flexGroup} ${classes.center}`}>
            <ClimbStylesButtonGroup
              initialState={state.climbStyle}
              updateState={(value) => handleClick('climbStyle', value)}
            />
            {!isProject &&
              <AttemptButtonGroup
                initialState={state.attempt}
                updateState={(value) => handleClick('attempt', value)}
              />
            }
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.flexGroup}>
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
                e.target.value >= 0 &&
                handleClick('totalLength', Number.parseInt(e.target.value))
              }
              className={classes.textField}
            />
            {!isProject &&
              <FormControlLabel
                className={classes.formControlCheck}
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
            }
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

        <Grid item className={classes.buttonGroup}>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
        </Grid>
      </form >
    </>
  )
}

AddClimbComponents.propTypes = {
  isProject: PropTypes.bool,
  state: PropTypes.object,
  updateField: PropTypes.func,
  onSubmit: PropTypes.func,
  mutationError: PropTypes.bool,
  onClose: PropTypes.func,
}

export default AddClimbComponents