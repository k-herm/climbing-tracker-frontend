import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

import { useUserData } from '~/src/app/Hooks/userData'
import Header from '~/components/header'
import NumericStatistics from '~/components/dashboard/numericStatistics'

const useStyles = makeStyles((theme) => ({
  container: {
    height: theme.page.height
  },
  message: {
    margin: '1rem'
  }
}))

const getDateString = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const needPrefix = month < 10
  const year = date.getFullYear()
  return `${year}-${needPrefix ? 0 : ''}${month}-${day}`
}

const Dashboard = () => {
  const { userName } = useUserData()
  const { container, message } = useStyles()

  const title = userName
    ? `${userName[0].toUpperCase() + userName.substring(1)}'s Stats`
    : ''
  const today = new Date()

  return (
    <Box className={container}>
      <Header title='Dashboard' />
      <Box className={message}>
        <Typography variant='h6' align='center' color='textSecondary'>
          {title}
        </Typography>
        <Typography variant='subtitle1' align='center' color='textSecondary'>
          {today.toDateString()}
        </Typography>
      </Box>

      <NumericStatistics date={getDateString(today)} />
    </Box>
  )
}

export default Dashboard