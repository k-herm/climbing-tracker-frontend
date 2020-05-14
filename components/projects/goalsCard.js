import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Grid, CircularProgress, Typography } from '@material-ui/core'

import NetworkError from '~/components/networkError'

import { GET_GOALS_FOR_PROJECT } from '~/src/app/Queries/projectData'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(2),
  },
  centerFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  label: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    border: '1.5px solid lightgrey',
    borderRadius: '1rem',
    height: '350px',
    margin: '1rem',
    padding: '2rem'
  }
}))

const NoDataLabel = () => {
  const { label } = useStyles()
  return (
    <Typography className={label} color='textSecondary'>
      No goals entered yet!
    </Typography>
  )
}

const GoalsCard = ({ projectId }) => {
  const classes = useStyles()
  const { data, loading, error } = useQuery(GET_GOALS_FOR_PROJECT, {
    variables: { projectId }
  })

  return (
    <Card className={classes.card}>
      <Typography variant='h5' className={classes.title} color='primary'>
        Goals
      </Typography>
      {
        (loading || error) &&
        (<Box className={classes.centerFlex}>
          {error ? <NetworkError /> : <CircularProgress />}
        </Box>)
      }
    </Card>
  )
}

GoalsCard.propTypes = {
  projectId: PropTypes.string
}

export default GoalsCard