import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

const GradesBarChart = ({ categories, data, maxYAxis }) => {
  const theme = useTheme()
  console.log(data)
  return (
    <VictoryChart
      domainPadding={40}
      padding={{ top: 15, bottom: 50, right: 50, left: 50 }}
    >
      <VictoryAxis
        tickValues={categories}
        style={{
          ticks: { stroke: 'grey', size: 3 },
          tickLabels: {
            angle: -45,
            fontSize: 13,
            verticalAnchor: 'middle',
            textAnchor: 'end'
          }
        }}
      />
      <VictoryAxis
        dependentAxis
        domain={maxYAxis < 10 ? { y: [0, 9] } : null}
        label="Climb Count"
        tickFormat={(t) => Math.round(t) === t ? t : undefined}
      />
      <VictoryBar
        style={{ data: { fill: `${theme.palette.secondary.dark}` } }}
        barRatio={0.5}
        data={data}
        x="grade"
        y="count"
        animate={{
          duration: 500,
          onLoad: { duration: 300 }
        }}
      />

    </VictoryChart>
  )
}

export default GradesBarChart