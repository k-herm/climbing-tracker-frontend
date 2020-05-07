import gql from 'graphql-tag'

export const GET_ALL_PROJECTS_DATA = gql`
  query getAllProjectsData {
    projects {
      _id
      name
      location
      completedDate
      grade
      pitches {
        grade
        numberPitches
      }
      totalLength
      routeStyle
      climbStyle
      goals {
        _id
        grade
        numberClimbsToComplete
        climbsCompleted {
          name
          completedDate
        }
      }
      attempts {
        attemptType
        count
        sendCount
      }
    }
  }
`