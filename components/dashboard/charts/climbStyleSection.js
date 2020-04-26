import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Chip, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import InfoIcon from '@material-ui/icons/Info';

import ClimbStyleChart from './ClimbStyleChart'
import Chart from './Chart'

import { GET_CLIMBSTYLE_CHARTS } from '~/src/app/Queries/statistics'
import { formatGradeValue } from '~/src/app/utils'
import { CLIMB_STYLES } from '~/src/app/constants'

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chipStyle: {
    margin: theme.spacing(0.5),
  },
  info: {
    verticalAlign: 'middle'
  }
}))

const fixRouteStylesEnum = (style) => {
  if (style) {
    return style[0].toLowerCase().concat(style.substr(1).replace('-', ''))
  }
}

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
  const { chipContainer, chipStyle, info } = useStyles()
  const [routeStyle, setRouteStyle] = useState([])
  const [chips, setChips] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
  })

  const handleFilter = () => {
    const selectedRouteStyles = CLIMB_STYLES.reduce((arr, curr, i) => {
      if (chips[i]) arr.push(fixRouteStylesEnum(curr))
      return arr
    }, [])
    setRouteStyle(selectedRouteStyles)
  }

  return (
    <Paper>
      <ChartData routeStyle={routeStyle} />
      <Typography variant="caption" color="textSecondary" align="center" display="block">
        <InfoIcon className={info} /> Zoom and pan within the chart for data details
      </Typography>
      <Box className={chipContainer}>
        {CLIMB_STYLES.map((style, i) =>
          <li key={i}>
            <Chip
              label={style}
              size="small"
              clickable
              color="primary"
              className={chipStyle}
              onClick={() => setChips({ ...chips, [i]: !chips[i] })}
              icon={<DoneIcon />}
              variant={chips[i] ? "default" : "outlined"}
            />
          </li>
        )}
        <li key={CLIMB_STYLES.length}>
          <Chip
            label="Apply Filter"
            size="small"
            clickable
            color="secondary"
            className={chipStyle}
            onClick={handleFilter}
          />
        </li>
      </Box>
    </Paper>
  )
}

export default ClimbStyleSection