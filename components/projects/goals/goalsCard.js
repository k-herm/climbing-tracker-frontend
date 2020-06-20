import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CircularProgress, IconButton, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'

import NetworkError from '~/components/networkError'
import AddGoalsDialog from './addGoalsDialog'
import GoalsList from './goalsList'
import ClimbDataDialog from './climbDataDialog'

import { GET_GOALS_FOR_PROJECT } from '~/src/app/Queries/projectData'
import { useProjects } from '~/src/app/Hooks/useProjects'

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
  centerFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2),
    position: 'relative',
    margin: `${theme.spacing(2)}px 0`
  },
  label: {
    ...theme.noDataBox,
    height: '100px'
  }
}))

const NoDataLabel = () => {
  const { label } = useStyles()
  return (
    <Typography className={label} color='textSecondary'>
      No goals entered yet!
    </Typography>
  )
}

const GoalsCard = ({ project }) => {
  const classes = useStyles()
  const { setGoals } = useProjects()

  const { data, loading, error } = useQuery(GET_GOALS_FOR_PROJECT, {
    variables: { projectId: project._id, climbStyle: project.climbStyle }
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [openClimbData, setOpenClimbData] = useState(false)
  const isCustomGoals = project.goals.length ? project.goals[0].isCustom : true

  useEffect(() => {
    if (data && data.goals.length) {
      setGoals(project._id, data.goals)
    }
  }, [data])

  return (
    <>
      <Card className={classes.card}>
        <Typography variant='h5' className={classes.title} color='primary'>
          Goals
          <IconButton
            className={classes.addButton}
            color="primary"
            aria-label="add goal"
            component="span"
            onClick={() => setOpenDialog(true)}
          >
            {project.goals.length ? <EditIcon /> : <AddCircleIcon fontSize="large" />}
          </IconButton>
        </Typography>
        {data && !data.goals.length
          ? <NoDataLabel />
          : <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Add climbs similar to your project to check off the list!
            </Typography>
        }
        {
          (loading || error) &&
          (<Box className={classes.centerFlex}>
            {error ? <NetworkError /> : <CircularProgress />}
          </Box>)
        }
        <GoalsList
          data={data && data.goals}
          openDialog={() => setOpenClimbData(true)}
          pyramidView={!isCustomGoals}
        />
      </Card>

      <AddGoalsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        projectData={project}
      />
      {/* for pyramid buttons only */}
      <ClimbDataDialog
        open={openClimbData}
        onClose={() => setOpenClimbData(false)}
      // data={data && data.}
      />
    </>
  )
}

GoalsCard.propTypes = {
  projectId: PropTypes.string
}

export default GoalsCard