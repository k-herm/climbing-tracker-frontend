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
  query charts {
    charts {
      chartData {
        gradesChart {
          gradesChart {
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
  }
`

export const GET_CLIMBSTYLE_CHARTS = gql`
  query charts {
    charts {
      chartData {
        climbStyleChart{
          climbStyleChart {
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
            notSpecified {
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
  }
`

export const FILTER_CLIMBSTYLECHART = gql`
  query ClimbStyleChartFilter($routeStyle: Array!) {
    climbStyleChartFilter(routeStyle: $routeStyle) {
      userId
      chartData {
        climbStyleChart{
          climbStyleChart {
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
            notSpecified {
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
  }
`