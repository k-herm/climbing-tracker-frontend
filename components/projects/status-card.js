import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { Box, Card, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ArchiveIcon from '@material-ui/icons/Archive'

const useStyles = makeStyles((theme) => ({
  icon: {
    verticalAlign: 'bottom'
  },
  container: {
    display: 'grid',
    justifyItems: 'center',
  },
  card: {
    margin: 0,
    padding: theme.spacing(1),
    position: 'relative',
    top: `${theme.spacing(2)}px`,
    width: '70%',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gridGap: theme.spacing(1),
  },
  complete: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.custom.success
  },
  archived: {
    margin: theme.spacing(1),
    backgroundColor: theme.custom.creme
  }
}))

const StatusCard = ({ data }) => {
  const classes = useStyles()
  return (
    <Box className={`${classes.container} heyZeus`}>
      {data.isArchived &&
        <Card className={`${classes.card} ${classes.archived}`}>
          <Typography variant="h5" color="textSecondary">
            <ArchiveIcon fontSize="large" className={classes.icon} /> Archived
          </Typography>
        </Card>
      }
      {data.completedDate &&
        <Card className={`${classes.card} ${classes.complete}`}>
          <Typography variant="h5" color="primary">
            <CheckCircleIcon fontSize="large" className={classes.icon} /> Completed!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(data.completedDate).toDateString()}
          </Typography>
        </Card>
      }
    </Box>

  )
}

StatusCard.propTypes = {
  data: PropTypes.object
}

export default StatusCard