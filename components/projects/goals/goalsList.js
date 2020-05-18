
import { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, Typography } from '@material-ui/core'

import { formatGradeValue } from '~/src/app/utils'

// const useStyles = makeStyles((theme) => ({
//   buttonGroup: {
//     ...theme.buttonGroup,
//     '& > button': {
//       margin: 0
//     }
//   },
//   form: {
//     display: 'grid'
//   }
// }))

const GoalsList = ({ goals }) => {
  return (
    <Grid
      container
      // className={classes.goalsContainer}
      direction="column"
      justify="center"
      alignContent="center"
    // spacing={0}
    >
      <Grid item>
        <Card>
          <Typography>

          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

GoalsList.propTypes = {
  goals: PropTypes.array
}

export default GoalsList