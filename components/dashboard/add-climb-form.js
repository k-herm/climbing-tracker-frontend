import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import AddClimbComponents from '../form-components/add-climb-components'
import { getDateString, reverseFormatGradeValue } from '~/src/app/utils'
import { ADD_CLIMB } from '~/src/app/mutations/climb'

const AddClimbForm = ({ onClose }) => {
  const [addClimb, { error: mutationError }] = useMutation(ADD_CLIMB, {
    refetchQueries: [
      'NumericStats',
      'GradesChart',
      'ClimbStyleChart'
    ],
    awaitRefetchQueries: true
  })

  const [state, setState] = useState({
    name: '',
    location: '',
    date: new Date(),
    climbStyle: 'trad',
    attempt: 'topRope',
    grade: '',
    totalLength: 0,
    pitches: [],
    routeStyle: [],
    send: false
  })

  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = () => {
    const variables = { ...state }
    variables.date = getDateString(variables.date)
    variables.grade = reverseFormatGradeValue(variables.grade)
    variables.pitches = variables.pitches.map(pitch => ({
      grade: reverseFormatGradeValue(pitch.grade),
      numberPitches: Number.parseInt(pitch.numberPitches)
    }))

    addClimb({ variables })
  }

  return (
    <AddClimbComponents
      state={state}
      updateField={handleClick}
      onSubmit={onSubmit}
      mutationError={mutationError}
      onClose={onClose}
    />
  )
}

AddClimbForm.propTypes = {
  onClose: PropTypes.func
}

export default AddClimbForm