import gql from 'graphql-tag'

export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!,
    $location: String,
    $completedDate: Date,
    $climbStyle: ClimbStyleEnum!,
    $grade: GradeEnum!,
    $totalLength: Int,
    $pitches: [PitchInput]!,
    $routeStyle: [RouteStyleEnumT],
  ) {
    addProject(
      name: $name,
      location: $location,
      completedDate: $completedDate
      climbStyle: $climbStyle,
      grade: $grade,
      totalLength: $totalLength,
      pitches: $pitches,
      routeStyle: $routeStyle,
    ) {
      _id
      name
      location
      completedDate
      climbStyle
      grade
      totalLength
      pitches {
        grade
        numberPitches
      }
      routeStyle
    }
  }
`

export const ADD_GOAL = gql`
  mutation AddGoal(
    $projectId: ID,
    $grade: GradeEnum!,
    $numberClimbsToComplete: Int!,
    $isCustom: Boolean!,
    $climbStyle: ClimbStyleEnum!
  ) {
    addGoal(
      projectId: $projectId,
      grade: $grade,
      numberClimbsToComplete: $numberClimbsToComplete,
      isCustom: $isCustom,
      climbStyle: $climbStyle
    ) {
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

export const EDIT_GOAL = gql`
  mutation EditGoal(
    $id: ID!,
    $projectId: ID,
    $grade: GradeEnum,
    $numberClimbsToComplete: Int,
    $isCustom: Boolean,
    $climbStyle: ClimbStyleEnum!
  ) {
    editGoal(
      id: $id
      projectId: $projectId,
      grade: $grade,
      numberClimbsToComplete: $numberClimbsToComplete,
      isCustom: $isCustom,
      climbStyle: $climbStyle
    ) {
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

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(id: $id) {
      _id
    }
  }
`

export const ADD_ATTEMPT = gql`
  mutation AddAttempt(
    $projectId: ID,
    $date: Date,
    $attemptType: AttemptEnum!,
    $send: Boolean!
  ) {
    addAttempt(
      projectId: $projectId,
      date: $date,
      attemptType: $attemptType,
      send: $send
    ) {
      _id,
      projectId,
      date,
      attemptType,
      send
    }
  }
`