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

export const GET_GOALS_FOR_PROJECT = gql`
  query getGoalsForProject($projectId: ID) {
    goals(projectId: $projectId) {
      grade
      numberClimbsToComplete
      climbsCompleted {
        name
        completedDate
      }
      climbStyle
    }
  }
`