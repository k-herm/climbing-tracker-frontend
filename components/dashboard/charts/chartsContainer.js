import React from 'react'
import PropTypes from 'prop-types'
import { Card, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import GradesBarChart from './GradesBarChart'
import { formatGradeValue } from '~/src/app/utils'
import { GRADES } from './constants'

const useStyles = makeStyles((theme) => ({
  chartTitle: {
    textAlign: 'center',
    marginTop: '2rem',
  }
}))

const ChartsContainer = ({ data }) => {
  const { chartTitle } = useStyles()

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
      <Card>
        <Typography variant='h5' className={chartTitle} color='primary'>
          Total Climbs By Grade
        </Typography>
        <GradesBarChart
          data={gradesChart}
          categories={gradeCategories()}
          maxYAxis={highestCount}
        />
      </Card>

    </Container>
  )
}

ChartsContainer.propTypes = {
  data: PropTypes.object
}

export default ChartsContainer