import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import ClimbStyleChart from './ClimbStyleChart'
import Chart from './Chart'

import { GET_CLIMBSTYLE_CHARTS } from '~/src/app/Queries/statistics'
import { formatGradeValue } from '~/src/app/utils'

const ClimbStyleSection = () => {
  const { loading, data, error } = useQuery(GET_CLIMBSTYLE_CHARTS)

  if (loading || error) return <Chart loading={loading} error={error} />

  const { climbStyleChart, otherData: styleOtherData } = data.climbStyleChart.chartData.climbStyleChart
  const { sport, trad, notSpecified } = climbStyleChart
  const climbStyleCategories = styleOtherData.gradeRange.map(grade => formatGradeValue(grade))

  return (
    <Chart
      title="Grades By Style Over Time"
      noData={!sport.length && !trad.length && !notSpecified.length}
    >
      <ClimbStyleChart
        data={climbStyleChart}
        categories={climbStyleCategories}
        dateCategories={styleOtherData.dateRange}
      />
    </Chart>
  )
}

export default ClimbStyleSection