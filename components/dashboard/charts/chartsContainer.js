import React from 'react'
import PropTypes from 'prop-types'
import { Card, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GradesBarChart from './GradesBarChart'
import GradesAttemptChart from './GradesAttemptChart'
import ClimbStyleChart from './ClimbStyleChart'
import { formatGradeValue, getGradeCategories, getGradeCategoriesFromArray } from '~/src/app/utils'

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

  const { gradesChart, otherData } = data.gradesChart
  const { climbStyleChart, otherData: styleOtherData } = data.climbStyleChart

  gradesChart.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
  })
  // expensive with increasing climbs ?
  climbStyleChart.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    dataPoint.date = new Date(dataPoint.date)
  })
  const gradeChartCategories = otherData.gradeRange.map(grade => formatGradeValue(grade))
  const climbStyleCategories = styleOtherData.gradeRange.map(grade => formatGradeValue(grade))

  return (
    <Container maxWidth='sm'>
      <Card className={chart}>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Total Climbs By Grade
        </Typography>
        {gradesChart.length ?
          <GradesBarChart
            data={gradesChart}
            categories={gradeChartCategories}
            maxYAxis={otherData.highestCount}
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
            categories={gradeChartCategories}
          />
          : <NoClimbsLabel />
        }
      </Card>

      <Card className={chart}>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Grades By Style Over Time
        </Typography>
        {climbStyleChart.length ?
          <ClimbStyleChart
            data={climbStyleChart}
            categories={climbStyleCategories}
            dateCategories={styleOtherData.dateRange}
          />
          : <NoClimbsLabel />
        }
      </Card>

    </Container>
  )
}

ChartsContainer.propTypes = {
  data: PropTypes.object
}

export default ChartsContainer