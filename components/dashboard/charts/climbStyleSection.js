import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'

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
  }
}))

const fixRouteStylesEnum = (style) => {
  if (style) {
    return style[0].toLowerCase().concat(style.substr(1).replace('-', ''))
  }
}

const ClimbStyleSection = () => {
  const { chipContainer, chipStyle } = useStyles()
  const { data, error, loading, refetch } = useQuery(GET_CLIMBSTYLE_CHARTS, {
    variables: { routeStyle: ["crack", "offwidth"] }
  })
  const [chips, setChips] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
  })

  useEffect(() => {
    const routeStyle = CLIMB_STYLES.reduce((arr, curr, i) => {
      if (chips[i]) arr.push(fixRouteStylesEnum(curr))
      return arr
    }, [])
    ///////////REFETCH NOT WORKING WITH NEW VARIABLES
    ///////////ADD REFETCH TO APPLY BUTTON
    //////////GET RID OF NOT SPECIFIED CLIMB STYLE in CHART
    console.log(routeStyle);
    refetch({ variables: { routeStyle } })
    console.log(chips);
    console.log(data);
  }, [chips])

  if (loading || error) {
    return <Chart loading={loading} error={error} />
  }

  const { chartData, otherData } = data.climbStyleChart.climbStyleChart
  const { sport, trad, notSpecified } = chartData
  const climbStyleCategories = otherData.gradeRange.map(grade => formatGradeValue(grade))

  return (
    <Chart
      title="Grades By Style Over Time"
      noData={!sport.length && !trad.length && !notSpecified.length}
    >
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
              variant={chips[i] ? "default" : "outline"}
            />
          </li>
        )}
      </Box>
      <ClimbStyleChart
        data={chartData}
        categories={climbStyleCategories}
        dateCategories={otherData.dateRange}
      />
    </Chart>
  )
}

export default ClimbStyleSection