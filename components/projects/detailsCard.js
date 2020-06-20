import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { useProjects } from '~/src/app/Hooks/useProjects'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    display: 'grid',
    justifyItems: 'center',
    overflow: 'visible',
  },
  container: {
    margin: `${theme.spacing(1)}px 0`
  },
  complete: {
    margin: 0,
    padding: theme.spacing(1),
    position: 'relative',
    top: `-${theme.spacing(6)}px`,
    border: `2px solid ${theme.palette.primary.main}`,
    width: '70%',
    display: 'grid',
    justifyItems: 'center',
    gridGap: theme.spacing(1),
  },
  check: {
    verticalAlign: 'bottom'
  },
  grade: {
    fontWeight: 400,
    lineHeight: 0.85,
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  }
}))

const DetailsCard = ({ data }) => {
  const classes = useStyles()

  if (!data) return null

  const numPitches = data.pitches.reduce((arr, curr) => arr + curr.numberPitches, 0)
  const pitchString = numPitches > 1 ? 'Pitches' : 'Pitch'

  return (
    <Card className={classes.card}>
      {
        data.completedDate &&
        <Card className={classes.complete}>
          <Typography variant="h5" color="primary">
            <CheckCircleOutlineIcon fontSize="large" className={classes.check} /> Completed!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(data.completedDate).toDateString()}
          </Typography>
        </Card>
      }
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
          <Typography variant="body1" className={classes.marginLeft}>
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
          <Typography variant="body1" className={classes.marginLeft} color="textSecondary">
            {data.location && `${data.location} | `}
            {`${numPitches} ${pitchString}`}
            {data.totalLength && ` | ${data.totalLength} m`}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton
            aria-label="edit project details"
            variant="contained"
            size="small"
          //onClick
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  )
}

DetailsCard.propTypes = {
  projectId: PropTypes.string
}
export default DetailsCard