import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import { useTheme } from '@material-ui/core/styles'
import {
  VictoryLegend,
  VictoryGroup,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryScatter
} from 'victory'

const GradesAttemptChart = ({ categories, data }) => {
  const theme = useTheme()
  const { red, blue, yellow } = theme.chart.colors
  let maxYAxis = 0

  const topRopeData = data.reduce((allData, dataPoint) => {
    dataPoint.attempts.forEach(attempt => {
      if (attempt.attemptType === "topRope") {
        allData.push({
          grade: dataPoint.grade,
          count: attempt.count,
          sendCount: attempt.sendCount
        })
        if (attempt.count > maxYAxis) maxYAxis = attempt.count
      }
    })
    return allData
  }, [])
  const redpointData = data.reduce((allData, dataPoint) => {
    dataPoint.attempts.forEach(attempt => {
      if (attempt.attemptType === "redpoint") {
        allData.push({
          grade: dataPoint.grade,
          count: attempt.count,
          sendCount: attempt.sendCount
        })
      }
      if (attempt.count > maxYAxis) maxYAxis = attempt.count
    })
    return allData
  }, [])
  const onsightData = data.reduce((allData, dataPoint) => {
    dataPoint.attempts.forEach(attempt => {
      if (attempt.attemptType === "onsight") {
        allData.push({
          grade: dataPoint.grade,
          count: attempt.count,
          sendCount: attempt.sendCount
        })
      }
      if (attempt.count > maxYAxis) maxYAxis = attempt.count
    })
    return allData
  }, [])

  return (
    <VictoryChart
      domainPadding={5}
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
      <VictoryLegend
        x={90} y={20}
        orientation="horizontal"
        gutter={20}
        colorScale={[yellow, blue, red]}
        data={[
          { name: "Top Rope" }, { name: "Redpoint" }, { name: "Onsight" }
        ]}
      />
      <VictoryGroup
        style={{ data: { strokeWidth: 3, fillOpacity: 0.5 } }}
      >
        <VictoryArea
          style={{ data: { fill: yellow, stroke: yellow } }}
          data={topRopeData}
          x="grade"
          y="count"
          categories={{ x: categories }}
          animate={{
            duration: 500,
            onLoad: { duration: 300 }
          }}
          interpolation="cardinal"
        />
        <VictoryArea
          style={{ data: { fill: blue, stroke: blue } }}
          data={redpointData}
          x="grade"
          y="count"
          animate={{
            duration: 500,
            onLoad: { duration: 300 }
          }}
          interpolation="cardinal"
        />
        <VictoryArea
          style={{ data: { fill: red, stroke: red } }}
          data={onsightData}
          x="grade"
          y="count"
          animate={{
            duration: 500,
            onLoad: { duration: 300 }
          }}
          interpolation="cardinal"
        />
      </VictoryGroup>
      <VictoryScatter
        style={{ data: { fill: yellow } }}
        data={topRopeData}
        x="grade"
        y="count"
      />
      <VictoryScatter
        style={{ data: { fill: blue } }}
        data={redpointData}
        x="grade"
        y="count"
      />
      <VictoryScatter
        style={{ data: { fill: red } }}
        data={onsightData}
        x="grade"
        y="count"
      />
    </VictoryChart>
  )
}

GradesAttemptChart.propTypes = {
  categories: PropTypes.array,
  data: PropTypes.array
}

const compareProps = (prevProps, nextProps) => isEqual(prevProps, nextProps)
export default React.memo(GradesAttemptChart, compareProps)