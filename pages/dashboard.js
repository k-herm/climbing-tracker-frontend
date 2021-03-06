import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, LinearProgress, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import Header from '~/components/header'
import NetworkError from '~/components/network-error'
import NumericStatistics from '~/components/dashboard/numeric-statistics'
import GradesSection from '~/components/dashboard/charts/grades-section'
import ClimbStyleSection from '~/components/dashboard/charts/climb-style-section'

import { GET_NUMERIC_STATS } from '~/src/app/queries/statistics'
import { getDateString } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.page.navHeight
  },
  message: {
    margin: '1rem',
    padding: '1rem'
  }
}))

const Dashboard = () => {
  const { container, message } = useStyles()

  const today = new Date()
  const { loading, data, error } = useQuery(GET_NUMERIC_STATS, {
    variables: { date: getDateString(today) }
  })

  if (error && error.networkError.statusCode !== 401) {
    return <NetworkError />
  }

  return (
    <Box className={container}>
      <Header title='Dashboard' />
      {loading && <Box><LinearProgress /></Box>}
      {data &&
        <>
          <Box className={message}>
            <Typography variant='h6' align='center' color='textSecondary'>
              Stats
            </Typography>
            <Typography variant='subtitle1' align='center' color='textSecondary'>
              {today.toDateString()}
            </Typography>
          </Box>
          <NumericStatistics data={data.numericStats || {}} />

          <Box className={message}>
            <Typography variant='h6' align='center' color='textSecondary'>
              Analytics
            </Typography>
          </Box>
          <Container maxWidth="md">
            <GradesSection />
            <ClimbStyleSection />
          </Container>
        </>
      }
    </Box>
  )
}

export default Dashboard