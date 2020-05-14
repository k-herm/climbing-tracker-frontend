import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  stat: {
    margin: `0 ${theme.spacing(1)}px`,
  }
}))

const AttemptsCard = ({ attempts }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Typography variant='h5' className={classes.title} color='primary'>
        Total Attempts
      </Typography>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Typography variant='h4' className={classes.stat} color='secondary'>
          {attempts && attempts.length
            ? attempts.find(attempt => attempt.attemptType === 'redpoint').count
            : 0
          }
        </Typography>
        <Typography variant='h5' className={classes.stat} color='textPrimary'>
          redpoints
        </Typography>
      </Grid>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Typography variant='h4' className={classes.stat} color='secondary'>
          {attempts && attempts.length
            ? attempts.find(attempt => attempt.attemptType === 'topRope').count
            : 0
          }
        </Typography>
        <Typography variant='h5' className={classes.stat} color='textPrimary'>
          top ropes
        </Typography>
      </Grid>
    </Card>
  )
}

AttemptsCard.propTypes = {
  attemtps: PropTypes.array
}

export default AttemptsCard