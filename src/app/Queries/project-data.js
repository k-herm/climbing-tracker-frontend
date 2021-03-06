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
      isArchived
    }
  }
`

export const GET_LOCAL_PROJECTS = gql`
  query getLocalProjects {
    projects @client {
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
      isArchived
    }
  }
`

export const GET_GOALS_FOR_PROJECT = gql`
  query getGoalsForProject($projectId: ID, $climbStyle: ClimbStyleEnum) {
    goals(projectId: $projectId, climbStyle: $climbStyle) {
      _id
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