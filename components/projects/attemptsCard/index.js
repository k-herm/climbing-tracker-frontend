import { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, IconButton, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddAttemptsDialog from './addAttemptsDialog'

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

  const { attempts } = projectData
  const [openDialog, setOpenDialog] = useState(false)

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
            {attempts && attempts.length
              ? attempts.find(attempt => attempt.attemptType === 'redpoint').count
              : 0
            }
          </Typography>
          <Typography variant='h5' className={classes.stat} color='textPrimary'>
            redpoints
        </Typography>
        </Grid>
        <Grid container alignItems="center" justify="center" spacing={1}>
          <Typography variant='h4' className={classes.stat} color='secondary'>
            {attempts && attempts.length
              ? attempts.find(attempt => attempt.attemptType === 'topRope').count
              : 0
            }
          </Typography>
          <Typography variant='h5' className={classes.stat} color='textPrimary'>
            top ropes
        </Typography>
        </Grid>
      </Card>
      <AddAttemptsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        data={projectData}
      />
    </>
  )
}

AttemptsCard.propTypes = {
  projectData: PropTypes.object
}

export default AttemptsCard