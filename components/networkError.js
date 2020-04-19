import React from 'react'
import { Box, Typography } from '@material-ui/core'

const NetworkError = () =>
  <Box>
    <Typography variant='h2' align='center' color='textSecondary'>
      Oops! There was an error loading the page.
    </Typography>
    <Typography variant='h2' align='center' color='textSecondary'>
      Please wait and try again.
    </Typography>
  </Box>

export default NetworkError