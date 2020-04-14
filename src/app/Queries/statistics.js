import gql from 'graphql-tag'

export const GET_STATISTICS = gql`
  query Stats($date: Date!) {
    stats(date: $date) {
      userId
      numericStatistics {
        totalVertical
        highestRedpointGrade
        totalDaysThisYear
        pitchesThisMonth
      }
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
        climbStyleChart{
          climbStyleChart {
            grade
            date
            routeStyle
            climbStyle
            attempt
            send
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