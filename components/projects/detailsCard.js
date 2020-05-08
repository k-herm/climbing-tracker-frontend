import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  container: {
    margin: `${theme.spacing(1)}px 0`
  },
  grade: {
    fontWeight: 400,
    lineHeight: 0.85,
  },
  location: {
    marginLeft: theme.spacing(1)
  }
}))

const DetailsCard = ({ data }) => {
  const classes = useStyles()

  const numPitches = data.pitches.reduce((arr, curr) => arr + curr.numberPitches, 0)
  const pitchString = numPitches > 1 ? 'Pitches' : 'Pitch'

  if (!data) return null
  return (
    <Card className={classes.card}>
      <Grid
        className={classes.container}
        container
        alignItems="flex-end"
        justify="flex-start"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h1" className={classes.grade}>
            {formatGradeValue(data.grade)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {data.climbStyle}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.container}
        justify="space-between"
      >

        <Grid item>
          <Typography variant="body1" className={classes.location} color="textSecondary">
            {data.location && `${data.location} | `}{`${numPitches} ${pitchString}`}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton
            aria-label="edit project details"
            variant="contained"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  )
}

DetailsCard.propTypes = {
  data: PropTypes.object
}
export default DetailsCard