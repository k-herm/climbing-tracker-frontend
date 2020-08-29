import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, IconButton, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddAttemptsDialog from './add-attempts-dialog'

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: 'absolute',
    right: theme.spacing(1),
    bottom: theme.spacing(0.5),
    padding: 0
  },
  card: {
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    position: 'relative',
    margin: `${theme.spacing(2)}px 0`
  },
  stat: {
    margin: `0 ${theme.spacing(1)}px`,
  }
}))

const AttemptsCard = ({ projectData }) => {
  const classes = useStyles()
  const [redpoints, setRedpoints] = useState(0)
  const [topRopes, setTopRopes] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const { attempts } = projectData

    const redpoints = attempts.find(attempt => attempt.attemptType === 'redpoint')
    redpoints && setRedpoints(redpoints.count)

    const topRopes = attempts.find(attempt => attempt.attemptType === 'topRope')
    topRopes && setTopRopes(topRopes.count)
  }, [projectData])

  return (
    <>
      <Card className={classes.card}>
        <Typography variant='h5' className={classes.title} color='primary'>
          Total Attempts
          <IconButton
            className={classes.addButton}
            color="primary"
            aria-label="add attempt"
            component="span"
            onClick={() => setOpenDialog(true)}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Typography>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Typography variant='h4' className={classes.stat} color='secondary'>
            {redpoints}
          </Typography>
          <Typography variant='h5' className={classes.stat} color='textPrimary'>
            redpoints
        </Typography>
        </Grid>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Typography variant='h4' className={classes.stat} color='secondary'>
            {topRopes}
          </Typography>
          <Typography variant='h5' className={classes.stat} color='textPrimary'>
            top ropes
        </Typography>
        </Grid>
      </Card>
      <AddAttemptsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        projectData={projectData}
      />
    </>
  )
}

AttemptsCard.propTypes = {
  projectData: PropTypes.object
}

export default AttemptsCard