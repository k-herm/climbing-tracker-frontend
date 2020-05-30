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
        isCustom
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
  query getGoalsForProject($projectId: ID, $climbStyle: ClimbStyleEnum) {
    goals(projectId: $projectId, climbStyle: $climbStyle) {
      grade
      numberClimbsToComplete
      isCustom
      climbsCompleted {
        name
        completedDate
      }
    }
  }
`