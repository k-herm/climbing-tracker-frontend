import React from 'react'
import PropTypes from 'prop-types'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh'
  },
  media: {
    width: '100%',
    height: '100vh',
    backgroundPosition: ({ isSmallerDisplay, mediaQueryPosition }) =>
      isSmallerDisplay && mediaQueryPosition
        ? mediaQueryPosition
        : 'center',
    '& h2': {
      color: 'white',
      margin: theme.spacing(1),
    }
  }
}))

const Cover = ({ image, headline, mediaQueryPosition }) => {
  const isSmallerDisplay = useMediaQuery('(max-width: 540px)')
  const classes = useStyles({ isSmallerDisplay, mediaQueryPosition })

  return (
    <CardMedia image={image} className={classes.media}>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={false}><></></Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2">
            {headline}
          </Typography>
        </Grid>
        <Grid item xs={false} sm={6}><></></Grid>
      </Grid>
    </CardMedia>
  )
}

Cover.propTypes = {
  image: PropTypes.string,
  headline: PropTypes.string,
  mediaQueryPosition: PropTypes.string
}

export default Cover