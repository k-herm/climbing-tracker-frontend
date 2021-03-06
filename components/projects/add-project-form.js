import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'

import AddClimbComponents from '../form-components/add-climb-components'
import { reverseFormatGradeValue } from '~/src/app/utils'
import { ADD_PROJECT } from '~/src/app/mutations/project'
import { addOne } from '~/src/app/mutations/cache'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/queries/project-data'

const expectedDataObject = (variables) => ({
  __typename: 'Mutation',
  addProject: {
    __typename: 'Project',
    _id: '1',
    ...variables,
    pitches: variables.pitches.map(pitch => ({
      __typename: 'Pitch',
      ...pitch
    })),
    completedDate: null,
    goals: [],
    attempts: [],
    isArchived: false
  }
})

const AddProjectForm = ({ onClose }) => {
  const [addProject, { error: mutationError }] = useMutation(ADD_PROJECT)

  const [state, setState] = useState({
    name: '',
    location: '',
    completedDate: null,
    climbStyle: 'trad',
    grade: '',
    totalLength: 0,
    pitches: [],
    routeStyle: [],
  })

  const handleClick = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = () => {
    const variables = { ...state }
    variables.grade = reverseFormatGradeValue(variables.grade)
    variables.pitches = variables.pitches.map(pitch => ({
      grade: reverseFormatGradeValue(pitch.grade),
      numberPitches: Number.parseInt(pitch.numberPitches)
    }))

    addProject({
      variables,
      update: (cache, { data }) => addOne(
        cache,
        GET_ALL_PROJECTS_DATA,
        {
          data: { ...data.addProject, goals: [], attempts: [] },
          type: 'projects'
        }
      ),
      optimisticResponse: expectedDataObject(variables)
    })
  }

  return (
    <AddClimbComponents
      isProject
      state={state}
      updateField={handleClick}
      onSubmit={onSubmit}
      mutationError={mutationError}
      onClose={onClose}
    />
  )
}

AddProjectForm.propTypes = {
  onClose: PropTypes.func
}

export default AddProjectForm