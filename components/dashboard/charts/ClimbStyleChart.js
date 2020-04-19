import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import {
  createContainer,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip
} from 'victory';
import { useTheme } from '@material-ui/core/styles'
import { getMonth, formatGradeValue } from '~/src/app/utils'

// const InterpolationSelect = ({ currentValue, values, onChange }) => {
//    const Select = styled.select`
//       margin-left: 40%;
//       font-size: 1.5rem;
//    `;

//    return (
//       <Select onChange={onChange} value={currentValue} style={{ width: 100 }}>
//          {values.map(value => <option value={value} key={value}>{value}</option>)}
//       </Select>
//    );
// }

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

const ClimbStyleChart = ({ categories, data, dateCategories }) => {
  const theme = useTheme()
  const { primary, secondary } = theme.palette
  const { red } = theme.chart.colors
  // expensive with increasing climbs ?
  data.trad.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    dataPoint.date = new Date(dataPoint.date)
  })
  data.sport.forEach(dataPoint => {
    dataPoint.grade = formatGradeValue(dataPoint.grade)
    dataPoint.date = new Date(dataPoint.date)
  })
  data.notSpecified.forEach(dataPoint => {
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
  //  constructor(props) {
  //     super(props);

  //     this.interpolations = this.props.interpolations;
  //     this.state = {
  //        interpolation: this.interpolations[0],
  //     }

  //  }
  // data filtered by style
  // const interpolationData = data.filter(climb => climb[this.props.filter].includes(this.state.interpolation));

  return (
    <>
      {/* <InterpolationSelect
               currentValue={this.state.interpolation}
               values={this.interpolations}
               onChange={e => {
                  this.setState({ interpolation: e.target.value });
               }}
            />
            {interpolationData.length === 0 ? <Label>No climbs logged</Label> : <></>} */}

      <VictoryChart
        domainPadding={10}
        padding={{ top: 15, bottom: 50, right: 50, left: 50 }}
        containerComponent={<VictoryZoomVoronoiContainer />}
      >
        <VictoryAxis
          style={{
            axisLabel: { padding: 35 },
            ticks: { stroke: 'grey', size: 3 },
            tickLabels: {
              angle: -45,
              fontSize: 10,
              verticalAnchor: 'middle',
              textAnchor: 'end'
            }
          }}

          // scale={{ x: "time" }}
          label={yearRange.join(' // ')}
          tickValues={dates}
          tickFormat={(t) => getMonth(t).substr(0, 3)}
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
          x={90} y={0}
          orientation="horizontal"
          gutter={20}
          colorScale={[primary.dark, secondary.dark, red]}
          data={[
            { name: "Sport" }, { name: "Trad" }, { name: "Not Specified" }
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
          data={data.notSpecified}
          x="date"
          y="grade"
          size={2.5}
          style={{ data: { fill: red } }}
          labels={({ datum }) => `${datum.grade}, ${
            getMonth(datum.date).substr(0, 3)
            } ${datum.date.getFullYear()}`
          }
          labelComponent={<VictoryTooltip constrainToVisibleArea />}
        />
        <VictoryScatter
          data={data.sport}
          x="date"
          y="grade"
          size={2.5}
          style={{ data: { fill: primary.dark } }}
          labels={({ datum }) => `${datum.grade}, ${
            getMonth(datum.date).substr(0, 3)
            } ${datum.date.getFullYear()}`
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
            } ${datum.date.getFullYear()}`
          }
          labelComponent={<VictoryTooltip constrainToVisibleArea />}
        />
      </VictoryChart>
    </>
  )
}

ClimbStyleChart.propTypes = {
  categories: PropTypes.array,
  data: PropTypes.object,
  dateCategories: PropTypes.array
}

const compareProps = (prevProps, nextProps) => isEqual(prevProps, nextProps)
export default React.memo(ClimbStyleChart, compareProps)