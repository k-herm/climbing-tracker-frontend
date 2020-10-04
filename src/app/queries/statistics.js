import gql from 'graphql-tag'

export const GET_NUMERIC_STATS = gql`
  query NumericStats($date: Date!) {
    numericStats(date: $date) {
      numericStatistics {
        totalVertical
        highestRedpointGrade
        totalDaysThisYear
        pitchesThisMonth
      }
    }
}
`

export const GET_GRADES_CHARTS = gql`
  query GradesChart {
    gradesChart {
      gradesChart {
        chartData {
          grade
          count
          attempts {
            attemptType
            count
            sendCount
          }
        }
        otherData {
          gradeRange
          highestCount
        }
      }
    }
  }
`

export const GET_CLIMBSTYLE_CHARTS = gql`
  query ClimbStyleChart($routeStyle: [RouteStyleEnumT!]) {
    climbStyleChart(routeStyle: $routeStyle){
      climbStyleChart {
        chartData {
          sport {
            grade
            date
            routeStyle
            climbStyle
            attempt
            send
          }
          trad {
            grade
            date
            routeStyle
            climbStyle
            attempt
            send
          }
        }
        otherData {
          gradeRange
          dateRange
        }
      }
    }
  }
`
