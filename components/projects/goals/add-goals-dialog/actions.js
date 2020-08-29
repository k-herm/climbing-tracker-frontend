import { formatGradeValue, reverseFormatGradeValue } from '~/src/app/utils'
import { GRADES } from '~/src/app/constants'
import { getOptimisticResponseObject } from '~/src/app/mutations/cache'
import { GET_ALL_PROJECTS_DATA, GET_GOALS_FOR_PROJECT } from '~/src/app/queries/project-data'

const update = (cache, goalData, projectData, type) => {
  const projects = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
  const project = projects.projects.find(project => project._id === projectData._id)

  const goalId = goalData._id
  const goals = cache.readQuery({
    query: GET_GOALS_FOR_PROJECT,
    variables: { projectId: projectData._id, climbStyle: projectData.climbStyle }
  })

  if (type === 'delete') {
    project.goals = project.goals.filter(goal => goal._id !== goalId)
    goals.goals = goals.goals.filter(goal => goal._id !== goalId)
  }
  if (type === 'add') {
    project.goals = [...project.goals, { ...goalData }]
    goals.goals = [...goals.goals, { ...goalData }]
  }

  cache.writeQuery({ query: GET_ALL_PROJECTS_DATA, data: projects })
  cache.writeQuery({
    query: GET_GOALS_FOR_PROJECT,
    variables: { projectId: projectData._id, climbStyle: projectData.climbStyle },
    data: goals
  })
}

export const setGoalsMutations = (projectData, goals, isCustom, [add, edit, del]) => {
  return goals.forEach(goal => {
    if (goal._id && goal.isDeleted) {
      del({
        variables: { id: goal._id },
        update: (cache, { data }) => update(cache, data.deleteGoal, projectData, 'delete'),
        optimisticResponse: getOptimisticResponseObject('deleteGoal', 'Goal', goal)
      })
      return
    }
    const variables = {
      projectId: projectData._id,
      grade: reverseFormatGradeValue(goal.grade),
      numberClimbsToComplete: Number.parseInt(goal.numberClimbsToComplete),
      isCustom,
      climbStyle: projectData.climbStyle
    }

    if (goal._id) {
      edit({ variables: { id: goal._id, ...variables } })
      return
    }

    if (!goal._id) {
      add({
        variables,
        update: (cache, { data }) => update(cache, data.addGoal, projectData, 'add'),
        optimisticResponse: getOptimisticResponseObject(
          'addGoal',
          'Goal',
          {
            _id: '1',
            ...variables,
            climbsCompleted: []
          }
        )
      })
      return
    }
    return
  })
}

export const deleteAllGoals = (projectData, goals, del) => {
  return goals.forEach(goal =>
    del({
      variables: { id: goal._id },
      update: (cache, { data }) => update(cache, data.deleteGoal, projectData, 'delete'),
      optimisticResponse: getOptimisticResponseObject('deleteGoal', 'Goal', goal)
    })
  )
}

export const createPyramid = (projectData, addGoal) => {
  const NUM_CLIMBS = [2, 4, 3, 3]
  const projectGrade = formatGradeValue(projectData.grade)
  const index = GRADES.findIndex(grade => grade === projectGrade)

  for (let i = 0; i < NUM_CLIMBS.length; i++) {
    if (index - i - 1 < 0) break

    const variables = {
      projectId: projectData._id,
      climbStyle: projectData.climbStyle,
      grade: reverseFormatGradeValue(GRADES[index - i - 1]),
      numberClimbsToComplete: NUM_CLIMBS[i],
      isCustom: false
    }

    addGoal({
      variables,
      update: (cache, { data }) => update(cache, data.addGoal, projectData, 'add'),
      optimisticResponse: getOptimisticResponseObject(
        'addGoal',
        'Goal',
        {
          _id: '1',
          ...variables,
          climbsCompleted: []
        }
      )
    })
  }
}
