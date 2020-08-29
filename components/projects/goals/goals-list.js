import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import ClimbDataButton from './climb-data-button'
import ClimbDataListItem from './climb-data-list-item'
import { formatGradeValue, sortArrayOfObjectsByGrade } from '~/src/app/utils'

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
      const goals = sortArrayOfObjectsByGrade(
        data.map(goal => ({
          ...goal,
          grade: formatGradeValue(goal.grade)
        })),
        'grade'
      ).reverse()
      setGoals(goals)
    }
  }, [data])

  useEffect(() => setIsPyramidView(pyramidView), [pyramidView])

  const getClimbDataButtons = (goal) => {
    const climbButtons = []
    for (let i = 0; i < goal.numberClimbsToComplete; i++) {
      const dialogData = {
        grade: goal.grade,
        name: goal.climbsCompleted[i] && goal.climbsCompleted[i].name,
        completedDate: goal.climbsCompleted[i] && goal.climbsCompleted[i].completedDate,
      }
      climbButtons.push(
        <ClimbDataButton
          key={i + goal.grade}
          grade={goal.grade}
          onClick={() => openDialog(dialogData)}
          disabled={!goal.climbsCompleted[i]}
        />
      )
    }
    return climbButtons
  }

  // TODO ONCLICK PROJECT BUTTON
  return (
    <>
      {isPyramidView ?
        <Box className={classes.boxContainer}>
          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade={formatGradeValue(projectData.grade)}
              climbName={projectData.name}
              disabled
            // onClick
            />
          </Box>

          <Box className={classes.flexContainer}>
            {getClimbDataButtons(goals[0])}
          </Box>
          <Box className={classes.flexContainer}>
            {getClimbDataButtons(goals[1])}
          </Box>
          <Box className={classes.flexContainer}>
            {getClimbDataButtons(goals[2])}
            {getClimbDataButtons(goals[3])}
          </Box>
        </Box>
        :
        <>
          {goals.map((goal, i) => <ClimbDataListItem key={i} data={goal} />)}
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