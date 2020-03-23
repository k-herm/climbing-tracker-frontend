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
    }
  }
`