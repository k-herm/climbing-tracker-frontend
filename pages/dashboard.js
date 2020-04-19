import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, LinearProgress, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import Header from '~/components/header'
import NetworkError from '~/components/networkError'
import NumericStatistics from '~/components/dashboard/numericStatistics'
import ChartsContainer from '~/components/dashboard/charts/ChartsContainer'

import { GET_NUMERIC_STATS } from '~/src/app/Queries/statistics'
import { useUserData } from '~/src/app/Hooks/userData'
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
  const { userName } = useUserData()
  const { container, message } = useStyles()

  const today = new Date()
  const { loading, data, error } = useQuery(GET_NUMERIC_STATS, {
    variables: { date: getDateString(today) }
  })

  const title = userName
    ? `${userName[0].toUpperCase() + userName.substring(1)}'s Stats`
    : ''

  if (error) {
    return <NetworkError />
  }

  return (
    <Box className={container}>
      <Header title='Dashboard' />

      {loading ?
        <Box>
          <LinearProgress />
        </Box>
        :
        <>
          <Box className={message}>
            <Typography variant='h6' align='center' color='textSecondary'>
              {title}
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
          <ChartsContainer />
        </>
      }
    </Box>
  )
}

export default Dashboard