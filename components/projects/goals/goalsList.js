import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import ClimbDataButton from './climbDataButton'
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

const GoalsList = ({ data, pyramidView }) => {
  const classes = useStyles()
  const [goals, setGoals] = useState(data)
  const [isPyramidView, setIsPyramidView] = useState(pyramidView)

  useEffect(() => {
    if (data) {
      const goals = data.map(goal => ({ ...goal, grade: formatGradeValue(goal.grade) }))
      sortArrayOfObjectsByGrade(goals, 'grade')
      setGoals(goals)




      console.log(goals)
    }
  }, [data])

  useEffect(() => setIsPyramidView(pyramidView), [pyramidView])

  return (
    <Box className={classes.boxContainer}>
      <Box className={classes.flexContainer}>
        <ClimbDataButton
          grade="5.6"
          climbName="hello derr"
          onClick={() => console.log('hellloooo')}
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

    // <Grid
    //   container
    //   // className={classes.goalsContainer}
    //   direction="column"
    //   // justify="center"
    //   // alignContent="center"
    //   alignItems="center"
    //   spacing={1}
    // >
    //   <Grid item>
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //   </Grid>
    //   <Grid item>
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //   </Grid>
    //   <Grid item wrap="nowrap">

    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //     <ClimbDataButton
    //       grade="5.6"
    //     />
    //   </Grid>
    // </Grid>
  )
}

GoalsList.propTypes = {
  data: PropTypes.array,
  pyramidView: PropTypes.bool
}

export default GoalsList