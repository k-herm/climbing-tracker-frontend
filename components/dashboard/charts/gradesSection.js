import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import GradesBarChart from './GradesBarChart'
import GradesAttemptChart from './GradesAttemptChart'
import Chart from './Chart'

import { GET_GRADES_CHARTS } from '~/src/app/Queries/statistics'
import { formatGradeValue } from '~/src/app/utils'

const GradesSection = () => {
  const { loading, data, error } = useQuery(GET_GRADES_CHARTS)

  if (loading || error) return <Chart loading={loading} error={error} />

  const { gradesChart, otherData } = data.charts.chartData.gradesChart
  gradesChart.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
  })
  const gradeChartCategories = otherData.gradeRange.map(grade => formatGradeValue(grade))

  return (
    <>
      <Chart title="Total Climbs By Grade" noData={!gradesChart.length}>
        <GradesBarChart
          data={gradesChart}
          categories={gradeChartCategories}
        />
      </Chart>

      <Chart title="Total Climbs By Grade" noData={!gradesChart.length}>
        <GradesAttemptChart
          data={gradesChart}
          categories={gradeChartCategories}
        />
      </Chart>
    </>
  )
}

export default GradesSection