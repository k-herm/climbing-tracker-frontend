import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info';

import ClimbStyleChart from './ClimbStyleChart'
import Chart from './Chart'
import ClimbStyleChipFilter from '../../formComponents/climbStyleChipFilter'

import { GET_CLIMBSTYLE_CHARTS } from '~/src/app/Queries/statistics'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles({
  info: {
    verticalAlign: 'middle'
  }
})

const ChartData = ({ routeStyle }) => {
  const { data, error, loading } = useQuery(GET_CLIMBSTYLE_CHARTS, {
    variables: { routeStyle }
  })

  if (loading || error) {
    return <Chart loading={loading} error={error} />
  }

  const { chartData, otherData } = data.climbStyleChart.climbStyleChart
  const { sport, trad } = chartData
  const climbStyleCategories = otherData.gradeRange.map(grade => formatGradeValue(grade))

  return (
    <Chart
      title="Grades By Style Over Time"
      noData={!sport.length && !trad.length}
    >
      <ClimbStyleChart
        data={chartData}
        categories={climbStyleCategories}
        dateCategories={otherData.dateRange}
      />
    </Chart>
  )
}

const ClimbStyleSection = () => {
  const { info } = useStyles()
  const [routeStyle, setRouteStyle] = useState([])

  return (
    <Paper>
      <ChartData routeStyle={routeStyle} />
      <Typography variant="caption" color="textSecondary" align="center" display="block">
        <InfoIcon className={info} /> Zoom and pan within the chart for data details
      </Typography>
      <ClimbStyleChipFilter updateState={(value) => setRouteStyle(value)} />
    </Paper>
  )
}

export default ClimbStyleSection