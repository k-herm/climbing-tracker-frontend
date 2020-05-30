import gql from 'graphql-tag'

export const ADD_GOAL = gql`
  mutation AddGoal(
    $projectId: ID,
    $grade: GradeEnum!,
    $numberClimbsToComplete: Int,
    $isCustom: Boolean
  ) {
    addGoal(
      projectId: $projectId,
      grade: $grade,
      numberClimbsToComplete: $numberClimbsToComplete,
      isCustom: $isCustom
    ) {
      _id
    }
  }
`