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

const GoalsList = ({ data, pyramidView, openDialog }) => {
  const classes = useStyles()
  const [goals, setGoals] = useState(data)
  const [isPyramidView, setIsPyramidView] = useState(pyramidView)

  useEffect(() => {
    if (data) {
      const goals = data.map(goal => ({ ...goal, grade: formatGradeValue(goal.grade) }))
      setGoals(goals)




      console.log(goals)
    }
  }, [data])

  //set pyramid view automatically if certain number of climbs?
  useEffect(() => setIsPyramidView(pyramidView), [pyramidView])

  // return network error else List
  return (
    <>
      {isPyramidView ?
        <Box className={classes.boxContainer}>
          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade="5.6"
              climbName="hello derr"
              onClick={() => openDialog()}
            // disabled
            />
          </Box>

          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
          </Box>

          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
          </Box>

          <Box className={classes.flexContainer}>
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
            <ClimbDataButton
              grade="5.6"
            />
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
  data: PropTypes.array,
  pyramidView: PropTypes.bool,
  openDialog: PropTypes.func
}

export default GoalsList