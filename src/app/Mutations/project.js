import gql from 'graphql-tag'

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


// args: {
//   projectId: {
//     type: GraphQLID,
//     description: 'Project Id'
//   },
//   date: {
//     type: GraphQLDate,
//     description: 'Date attempted'
//   },
//   attemptType: {
//     type: new GraphQLNonNull(AttemptEnum),
//     description: 'Style of attempt'
//   },
//   send: {
//     type: new GraphQLNonNull(GraphQLBoolean),
//     description: 'climb without takes or falls'
//   }
// },