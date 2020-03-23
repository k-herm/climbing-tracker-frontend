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
import { useQuery } from '@apollo/react-hooks'
import { GET_STATISTICS } from '~/src/app/Queries/statistics'

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
  if (!data) value = 'No Data'
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

const NumericStatistics = ({ date }) => {
  const { loading, data } = useQuery(GET_STATISTICS, {
    variables: { date }
  })
  if (loading) return null
  const {
    totalVertical,
    highestRedpointGrade,
    totalDaysThisYear,
    pitchesThisMonth
  } = data.stats.numericStatistics

  const highestRedpoint = highestRedpointGrade.replace(/_/, '').replace(/_/, '.')
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <StatContainer title='Total Vertical' data={totalVertical} />
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

// no proptypes date, gql only accepts date
// NumericStatistics.propTypes = {
//   date: PropTypes.object
// }

export default NumericStatistics