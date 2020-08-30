import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    height: '120px',
    backgroundColor: '#313131',
    color: 'white',
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      className={classes.container}
      alignItems="center"
      justify="center"
    >
      <Typography>Have feedback? Reach out!</Typography>
      <Typography>kiesha.herman@gmail.com</Typography>
    </Grid>
  )
}

export default Footer