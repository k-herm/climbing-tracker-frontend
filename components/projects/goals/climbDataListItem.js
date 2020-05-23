import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Typography
} from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: `0 ${theme.spacing(1)}px`
  },
  card: {
    margin: `${theme.spacing(1)}px 0`,
  },
  panel: {
    backgroundColor: theme.custom.creme
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: theme.spacing(2)
    }
  },
  subtitle: {
    fontWeight: 'bold'
  }
}))

const Bullet = () => {
  const classes = useStyles()
  return <span className={classes.bullet}>•</span>
}

const ClimbDataListItem = ({ data }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${data.grade} - goalContent`}
          id={data.grade}
        >
          <Box className={classes.summary}>
            {data.numberClimbsToComplete === data.climbsCompleted.length
              ? <CheckCircleOutlineIcon color="primary" />
              : <CheckBoxOutlineBlankIcon />
            }
            <Typography variant="h6">
              {data.grade}
            </Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid spacing={1} direction="column" alignItems="flex-start">
            <Typography color="secondary" className={classes.subtitle} gutterBottom>
              {`${data.climbsCompleted.length} / ${data.numberClimbsToComplete}`} Completed
            </Typography>
            {data.climbsCompleted.length &&
              data.climbsCompleted.map(climb =>
                <Typography gutterBottom>
                  <Bullet />{climb.name}: {climb.completedDate}
                </Typography>
              )
            }
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  )
}

ClimbDataListItem.propTypes = {
  data: PropTypes.object
}

export default ClimbDataListItem