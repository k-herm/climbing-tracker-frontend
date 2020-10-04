import gql from 'graphql-tag'

export const ADD_CLIMB = gql`
  mutation AddClimb(
    $name: String,
    $location: String,
    $date: Date!,
    $climbStyle: ClimbStyleEnum!,
    $attempt: AttemptEnum!,
    $grade: GradeEnum!,
    $totalLength: Int,
    $pitches: [PitchInput]!,
    $routeStyle: [RouteStyleEnumT],
    $send: Boolean!
  ) {
    addClimb(
      name: $name,
      location: $location,
      completedDate: $date,
      climbStyle: $climbStyle,
      attempt: $attempt,
      grade: $grade,
      totalLength: $totalLength,
      pitches: $pitches,
      routeStyle: $routeStyle,
      send: $send
    ) {
      _id
    }
  }
`