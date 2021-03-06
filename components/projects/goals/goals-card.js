import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, CircularProgress, IconButton, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'

import NetworkError from '~/components/network-error'
import AddGoalsDialog from './add-goals-dialog'
import GoalsList from './goals-list'
import ClimbDataDialog from './climb-data-dialog'

import { GET_GOALS_FOR_PROJECT } from '~/src/app/queries/project-data'

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
    position: 'relative',
    margin: `${theme.spacing(2)}px 0`
  },
  label: {
    ...theme.noDataBox,
    height: '100px'
  },
  topMargin: {
    marginTop: theme.spacing(4)
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
  const { data, loading, error } = useQuery(GET_GOALS_FOR_PROJECT, {
    variables: { projectId: project._id, climbStyle: project.climbStyle }
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [openClimbData, setOpenClimbData] = useState(false)
  const [isCustom, setIsCustom] = useState(true)
  const [goalButtonData, setGoalButtonData] = useState({})

  const [projectData, setProjectData] = useState(project)
  useEffect(() => {
    if (data) {
      setProjectData({ ...project, goals: [...data.goals] })
      data.goals.length ? setIsCustom(data.goals[0].isCustom) : setIsCustom(true)
    } else {
      setProjectData({ ...project, goals: [] })
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
            {data && data.goals.length ? <EditIcon /> : <AddCircleIcon fontSize="large" />}
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
        {data && data.goals.length ?
          <Box className={classes.topMargin}>
            <GoalsList
              projectData={projectData}
              data={data.goals}
              openDialog={(goal) => {
                setGoalButtonData(goal)
                setOpenClimbData(true)
              }}
              pyramidView={!isCustom}
            />
          </Box>
          : <></>
        }
      </Card>
      <AddGoalsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        projectData={projectData}
      />
      {/* dialog triggered in pyramid buttons only */}
      <ClimbDataDialog
        open={openClimbData}
        onClose={() => setOpenClimbData(false)}
        data={goalButtonData}
      />
    </>
  )
}

GoalsCard.propTypes = {
  project: PropTypes.object
}

export default GoalsCard