import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
} from 'victory';
import { useTheme } from '@material-ui/core/styles'
import { getMonth } from '~/src/app/utils'
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

const ClimbStyleChart = ({ categories, data, dateCategories }) => {
  const theme = useTheme()

  console.log(dateCategories);
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

          // scale={{ x: "time" }}
          // label={year}
          tickValues={dateCategories.map(date => new Date(date))}
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
          data={data}
          x="date"
          y="grade"
          size={2.5}
          style={{ data: { fill: theme.palette.secondary.dark } }}
        />
      </VictoryChart>
    </>
  )
}

const compareProps = (prevProps, nextProps) => isEqual(prevProps, nextProps)
export default React.memo(ClimbStyleChart, compareProps)