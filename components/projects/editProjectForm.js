import { useState } from 'react'
import PropTypes from 'prop-types'

import AddClimbComponents from '../formComponents/addClimbComponents'

import { formatGradeValue } from '~/src/app/utils'

const EditProjectForm = ({ onClose, onSubmit, data }) => {

  const [state, setState] = useState({
    name: data.name || '',
    location: data.location || '',
    completedDate: data.completedDate || null,
    climbStyle: data.climbStyle || 'trad',
    grade: formatGradeValue(data.grade) || '',
    totalLength: data.totalLength || 0,
    pitches: data.pitches.map(pitch => ({
      ...pitch,
      grade: formatGradeValue(pitch.grade)
    })) || [],
    routeStyle: data.routeStyle || [],
  })

  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <AddClimbComponents
      isProject
      state={state}
      updateField={handleClick}
      onSubmit={() => onSubmit(state)}
      onClose={onClose}
    />
  )
}

EditProjectForm.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  data: PropTypes.object
}

export default EditProjectForm