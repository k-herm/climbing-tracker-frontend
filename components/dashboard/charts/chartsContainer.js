import React from 'react'
import PropTypes from 'prop-types'
import { Card, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GradesBarChart from './GradesBarChart'
import GradesAttemptChart from './GradesAttemptChart'
import { formatGradeValue } from '~/src/app/utils'
import { GRADES } from './constants'

const useStyles = makeStyles((theme) => ({
  chart: {
    margin: '1rem 0'
  },
  chartTitle: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  label: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    border: '1.5px solid lightgrey',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '2rem'
  }
}))

const NoClimbsLabel = () => {
  const { label } = useStyles()
  return (
    <Typography className={label} color='textSecondary'>
      No climbs logged
    </Typography>
  )
}

const ChartsContainer = ({ data }) => {
  const { chart, chartTitle } = useStyles()

  const { gradesChart } = data

  const gradeCategories = () => {
    const highestIndex = GRADES.findIndex((grade) =>
      grade === gradesChart[gradesChart.length - 1].grade
    )
    const lowestIndex = GRADES.findIndex((grade) =>
      grade === gradesChart[0].grade
    )
    return GRADES.slice(lowestIndex, highestIndex + 1)
  }

  let highestCount = 0
  gradesChart.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    if (dataPoint.count > highestCount) {
      highestCount = dataPoint.count
    }
  })

  return (
    <Container maxWidth='sm'>
      <Card className={chart}>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Total Climbs By Grade
        </Typography>
        {gradesChart.length ?
          <GradesBarChart
            data={gradesChart}
            categories={gradeCategories()}
            maxYAxis={highestCount}
          />
          : <NoClimbsLabel />
        }
      </Card>

      <Card className={chart}>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Total Climbs By Grade
        </Typography>
        {gradesChart.length ?
          <GradesAttemptChart
            data={gradesChart}
            categories={gradeCategories()}
          // maxYAxis={highestCount}
          />
          : <NoClimbsLabel />
        }
      </Card>

      {/* <Card className={chart}>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Total Climbs By Grade
        </Typography>
        {gradesChart.length ?
          <GradesBarChart
            data={gradesChart}
            categories={gradeCategories()}
            maxYAxis={highestCount}
          />
          : <NoClimbsLabel />
        }
      </Card> */}

    </Container>
  )
}

ChartsContainer.propTypes = {
  data: PropTypes.object
}

export default ChartsContainer