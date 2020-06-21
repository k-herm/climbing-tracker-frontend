import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import ClimbDataButton from './climbDataButton'
import ClimbDataListItem from './climbDataListItem'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    overflow: 'scroll'
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: `${theme.spacing(1)}px 0`
  }
}))

const GoalsList = ({ projectData, data, pyramidView, openDialog }) => {
  const classes = useStyles()
  const [goals, setGoals] = useState(data)
  const [isPyramidView, setIsPyramidView] = useState(pyramidView)

  useEffect(() => {
    if (data) {
      const goals = data.map(goal => ({ ...goal, grade: formatGradeValue(goal.grade) })).reverse()
      setGoals(goals)
    }
  }, [data])

  //set pyramid view automatically if certain number of climbs?
  useEffect(() => setIsPyramidView(pyramidView), [pyramidView])

  const ClimbDataButtons = (goal) => {
    const climbButtons = []
    for (let i = 0; i < goal.numberClimbsToComplete; i++) {
      const climbName = goal.climbsCompleted[i] ? goal.climbsCompleted[i].name : null
      climbButtons.push(
        <ClimbDataButton
          key={i + climbName}
          grade={goal.grade}
          onClick={openDialog}
          disabled={!climbName}
        />
      )
    }
    return climbButtons
  }

  // return network error else List
  return (
    <>
      {isPyramidView ?
        <Box className={classes.boxContainer}>
          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade={formatGradeValue(projectData.grade)}
              climbName={projectData.name}
            // onClick
            />
          </Box>

          <Box className={classes.flexContainer}>
            {ClimbDataButtons(goals[0])}
          </Box>
          <Box className={classes.flexContainer}>
            {ClimbDataButtons(goals[1])}
          </Box>
          <Box className={classes.flexContainer}>
            {ClimbDataButtons(goals[2])}
            {ClimbDataButtons(goals[3])}
          </Box>
        </Box>
        :
        <>
          {goals && goals.map((goal, i) => <ClimbDataListItem key={i} data={goal} />)}
        </>
      }
    </>
  )
}

GoalsList.propTypes = {
  projectData: PropTypes.object,
  data: PropTypes.array,
  pyramidView: PropTypes.bool,
  openDialog: PropTypes.func
}

export default GoalsList