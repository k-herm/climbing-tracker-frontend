import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import { GET_STATISTICS } from '~/src/app/Queries/statistics'
import { useUserData } from '~/src/app/Hooks/userData'
import Header from '~/components/header'
import NumericStatistics from '~/components/dashboard/numericStatistics'
import ChartsContainer from '~/components/dashboard/charts/ChartsContainer'
import { getDateString } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  container: {
    height: theme.page.height
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
  const { loading, data } = useQuery(GET_STATISTICS, {
    variables: { date: getDateString(today) }
  })

  const { numericStatistics, chartData } = data ? data.stats : {}
  const title = userName
    ? `${userName[0].toUpperCase() + userName.substring(1)}'s Stats`
    : ''

  return (
    <Box className={container}>
      <Header title='Dashboard' />

      {loading
        ?
        <Box className={message}>
          <Typography variant='h6' align='center' color='textSecondary'>
            Loading ...
          </Typography>
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
          <NumericStatistics data={numericStatistics} />

          <Box className={message}>
            <Typography variant='h6' align='center' color='textSecondary'>
              Analytics
            </Typography>
          </Box>
          <ChartsContainer data={chartData} />
        </>
      }
    </Box>
  )
}

export default Dashboard