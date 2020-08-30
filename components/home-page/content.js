import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Fade from 'react-reveal/Fade'

const useStyles = makeStyles(theme => ({
  card: {
    paddingTop: '60px'
  },
  icon: {
    width: '100px',
    height: '100px',
    zIndex: 2,
    position: 'relative',
    marginBottom: '-50px'
  },
  cardMediaRight: {
    height: '500px',
    backgroundSize: 'contain'
  },
  cardMediaBottom: {
    height: '300px',
    backgroundSize: 'contain'
  }
}))

const Content = ({ icon, headline, imageBottom, imageRight }) => {
  const classes = useStyles()
  return (
    <Box margin="24px 16px">
      <Box display="flex" justifyContent="center">
        <CardMedia image={icon} className={classes.icon} />
      </Box>
      <Card className={classes.card}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={imageRight ? 8 : 12} container spacing={4}>
              <Grid item xs={12}>
                <Fade left>
                  <Typography variant="h5" align="center">
                    {headline}
                  </Typography>
                </Fade>
              </Grid>
              {imageBottom ?
                <Grid item xs={12}>
                  <Fade left>
                    <CardMedia image={imageBottom} className={classes.cardMediaBottom} />
                  </Fade>
                </Grid>
                : <></>
              }
            </Grid>
            {imageRight ?
              <Grid item xs={12} sm={4}>
                <Fade right>
                  <CardMedia image={imageRight} className={classes.cardMediaRight} />
                </Fade>
              </Grid>
              : <></>
            }
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

Content.propTypes = {
  icon: PropTypes.string,
  headline: PropTypes.string,
  imageRight: PropTypes.string,
  imageBottom: PropTypes.string
}

export default Content