import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: '150px',
    minWidth: '200px',
    paddingTop: '60px'
  },
  cardMedia: {
    width: '100px',
    height: '100px',
    zIndex: 2,
    position: 'relative',
    marginBottom: '-50px'
  }
}))

const Content = ({ icon, headline, images }) => {
  const classes = useStyles()
  return (
    <Box margin="16px">
      <Box display="flex" justifyContent="center">
        <CardMedia image={icon} className={classes.cardMedia} />
      </Box>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" align="center">
            {headline}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

Content.propTypes = {
  icon: PropTypes.string,
  headline: PropTypes.string,
  images: PropTypes.array
}

export default Content