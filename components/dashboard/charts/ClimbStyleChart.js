import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import {
  createContainer,
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip
} from 'victory';
import { useTheme } from '@material-ui/core/styles'
import { getMonth, formatGradeValue } from '~/src/app/utils'

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

const ClimbStyleChart = ({ categories, data, dateCategories }) => {
  const theme = useTheme()
  const { primary, secondary } = theme.palette
  data.trad.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    dataPoint.date = new Date(dataPoint.date)
  })
  data.sport.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    dataPoint.date = new Date(dataPoint.date)
  })

  const dates = dateCategories.map(date => new Date(date))
  const firstYear = dates[0].getFullYear()
  const lastYear = dates[dates.length - 1].getFullYear()
  const yearRange = []
  for (let i = firstYear; i <= lastYear; i++) {
    yearRange.push(i)
  }

  return (
    <VictoryChart
      domainPadding={10}
      padding={{ top: 15, bottom: 50, right: 50, left: 50 }}
      containerComponent={<VictoryZoomVoronoiContainer />}
    >
      <VictoryAxis
        style={{
          ticks: { stroke: 'grey', size: 3 },
          tickLabels: {
            angle: -45,
            fontSize: 10,
            verticalAnchor: 'middle',
            textAnchor: 'end'
          }
        }}
        tickValues={dates}
        tickFormat={(t) => {
          if (yearRange.length > 1) {
            return t.getMonth() % 2 === 0
              ? `${getMonth(t).substr(0, 3)} '${t.getFullYear() % 100}`
              : ''
          }
          return getMonth(t).substr(0, 3)
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={categories}
        style={{
          ticks: { stroke: 'grey', size: 3 },
          tickLabels: { fontSize: 12 }
        }}
      />
      <VictoryLegend
        x={150} y={0}
        orientation="horizontal"
        gutter={20}
        colorScale={[primary.dark, secondary.dark]}
        data={[
          { name: "Sport" }, { name: "Trad" }
        ]}
      />
      {/* calculate linear regression before plotting */}
      {/* <VictoryLine
          data={interpolationData}
          x="date"
          y="grade"
          style={{ data: { stroke: `${theme.green}` } }}
          animate={{
              duration: 1000,
              onLoad: { duration: 500 }
          }}
        /> */}
      <VictoryScatter
        data={data.sport}
        x="date"
        y="grade"
        size={2.5}
        style={{ data: { fill: primary.dark } }}
        labels={({ datum }) => `${datum.grade}, ${
          getMonth(datum.date).substr(0, 3)
          } ${datum.date.getDate()}, ${datum.date.getFullYear()}`
        }
        labelComponent={<VictoryTooltip constrainToVisibleArea />}
      />
      <VictoryScatter
        data={data.trad}
        x="date"
        y="grade"
        size={2.5}
        style={{ data: { fill: secondary.dark } }}
        labels={({ datum }) => `${datum.grade}, ${
          getMonth(datum.date).substr(0, 3)
          } ${datum.date.getDate()}, ${datum.date.getFullYear()}`
        }
        labelComponent={<VictoryTooltip constrainToVisibleArea />}
      />
    </VictoryChart>
  )
}

ClimbStyleChart.propTypes = {
  categories: PropTypes.array,
  data: PropTypes.object,
  dateCategories: PropTypes.array
}

const compareProps = (prevProps, nextProps) => isEqual(prevProps, nextProps)
export default React.memo(ClimbStyleChart, compareProps)