import gql from 'graphql-tag'

export const ADD_GOAL = gql`
  mutation AddGoal(
    $projectId: ID,
    $grade: GradeEnum!,
    $numberClimbsToComplete: Int!,
    $isCustom: Boolean!
  ) {
    addGoal(
      projectId: $projectId,
      grade: $grade,
      numberClimbsToComplete: $numberClimbsToComplete,
      isCustom: $isCustom
    ) {
      _id
      grade
      numberClimbsToComplete
      isCustom
    }
  }
`

export const EDIT_GOAL = gql`
  mutation EditGoal(
    $id: ID!,
    $projectId: ID,
    $grade: GradeEnum,
    $numberClimbsToComplete: Int,
    $isCustom: Boolean
  ) {
    editGoal(
      id: $id
      projectId: $projectId,
      grade: $grade,
      numberClimbsToComplete: $numberClimbsToComplete,
      isCustom: $isCustom
    ) {
      _id
      grade
      numberClimbsToComplete
      isCustom
    }
  }
`

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(id: $id) {
      _id
      grade
      numberClimbsToComplete
      isCustom
    }
  }
`