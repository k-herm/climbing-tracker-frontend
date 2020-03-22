import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Typography
} from '@material-ui/core'

import { UserContext } from '~/src/app/Contexts/UserStore'
import Header from '~/components/header'

const useStyles = makeStyles((theme) => ({
  container: {
    height: theme.page.height
  },
  message: {
    margin: '1rem'
  }
}))

const Dashboard = () => {
  const { id, name } = useContext(UserContext)
  const { container, message } = useStyles()

  const title = name
    ? `${name[0].toUpperCase() + name.substring(1)}'s Stats`
    : ''
  return (
    <Box className={container}>
      <Header title='Dashboard' />
      <Box className={message}>
        <Typography variant='h6' align='center' color='textSecondary'>
          {title}
        </Typography>
        <Typography variant='subtitle1' align='center' color='textSecondary'>
          {new Date().toDateString()}
        </Typography>
      </Box>
    </Box>
  )
}

export default Dashboard