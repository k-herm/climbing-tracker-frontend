import { formatGradeValue, reverseFormatGradeValue } from '~/src/app/utils'
import { GRADES } from '~/src/app/constants'
import { GET_ALL_PROJECTS_DATA, GET_GOALS_FOR_PROJECT } from '~/src/app/Queries/projectData'

const optimisticResponse = (type, goal) => ({
  __typename: 'Mutation',
  [`${type}Goal`]: {
    __typename: 'Goal',
    ...goal
  }
})

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
  if (type === 'edit') {
    const newGoals = [...project.goals]
    const goalToEdit = newGoals.find(goal => goal._id === goalId)
    //READ ONLY
    goalToEdit = { ...goalData }
    project.goals = [...newGoals]
    goals.goals = [...newGoals]
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
        optimisticResponse: optimisticResponse('delete', goal)
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
    // ADDING EXTRA GOALS WHEN IT SHOULD BE EDITING
    // TABLE NOT SYNCED - adding additional goals to array, not deleting, etc
    if (goal._id) {
      edit({
        variables: { id: goal._id, ...variables },
        update: (cache, { data }) => update(cache, data.editGoal, projectData, 'edit'),
      })
      return
    }

    if (!goal._id) {
      add({
        variables,
        update: (cache, { data }) => update(cache, data.addGoal, projectData, 'add'),
        optimisticResponse: optimisticResponse('add', {
          _id: '1',
          ...variables,
          climbsCompleted: []
        })
      })
      return
    }
    return
  })
}

export const deleteAllGoals = (goals, del) => {
  return goals.forEach(goal =>
    del({ variables: { id: goal._id } })
  )
}

export const createPyramid = (projectData, addGoalMutation, addGoalToState) => {
  const NUM_CLIMBS = [2, 4, 3, 3]
  const projectGrade = formatGradeValue(projectData.grade)
  const index = GRADES.findIndex(grade => grade === projectGrade)

  for (let i = 0; i < 4; i++) {
    if (index - i - 1 < 0) break

    const variables = {
      projectId: projectData._id,
      climbStyle: projectData.climbStyle,
      grade: reverseFormatGradeValue(GRADES[index - i - 1]),
      numberClimbsToComplete: NUM_CLIMBS[i],
      isCustom: false
    }

    addGoalMutation({
      variables,
      update: (cache, { data }) => update(cache, data.addGoal, projectData, 'add'),
    })
    // addGoalToState(projectData._id, { ...variables })
  }
}
