import React from 'react'
import { useRouter } from 'next/router'
import { Grid, Card, CardMedia, Link, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ResetForm from '~/components/user/reset-form'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh'
  },
  card: {
    padding: theme.spacing(1)
  },
  media: {
    padding: theme.spacing(),
    width: '100%',
    height: '100vh',
  }
}))

const ResetPage = () => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <CardMedia image="/climber.jpg" className={classes.media}>
      <Grid
        className={classes.container}
        container
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Card className={classes.card}>
            <ResetForm resetToken={router.query.resetToken} />
          </Card>
        </Grid>
      </Grid>
    </CardMedia>
  )
}

export default ResetPage