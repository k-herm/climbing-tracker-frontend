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