import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    textAlign: 'center'
  },
  titleStyle: {
    marginBottom: '1rem'
  }
}))

const StatContainer = ({ title, data }) => {
  const { cardContainer, titleStyle } = useStyles()
  let value = data
  if (!data) value = 0
  return (
    <Card className={cardContainer}>
      <CardContent>
        <Typography className={titleStyle} color='primary'>{title}</Typography>
        <Typography variant='h4' color='textPrimary'>{value}</Typography>
      </CardContent>
    </Card>
  )
}

StatContainer.propTypes = {
  title: PropTypes.string,
  data: PropTypes.any
}

const NumericStatistics = ({ data }) => {
  const {
    totalVertical,
    highestRedpointGrade,
    totalDaysThisYear,
    pitchesThisMonth
  } = data.numericStatistics

  const highestRedpoint = highestRedpointGrade && formatGradeValue(highestRedpointGrade)
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <StatContainer title='Total Vertical (m)' data={totalVertical} />
        </Grid>
        <Grid item xs={6}>
          <StatContainer title='Highest Redpoint' data={highestRedpoint} />
        </Grid>
        <Grid item xs={6}>
          <StatContainer title='Total Days This Year' data={totalDaysThisYear} />
        </Grid>
        <Grid item xs={6}>
          <StatContainer title='Pitches This Month' data={pitchesThisMonth} />
        </Grid>
      </Grid>
    </Container>
  )
}

NumericStatistics.propTypes = {
  data: PropTypes.object
}

export default NumericStatistics