import { reverseFormatGradeValue } from '~/src/app/utils'
import { GRADES } from '~/src/app/constants'
import { GET_ALL_PROJECTS_DATA, GET_GOALS_FOR_PROJECT } from '~/src/app/Queries/projectData'

const optimisticResponse = (type, goal) => ({
  __typename: 'Mutation',
  [`${type}Goal`]: {
    __typename: 'Goal',
    _id: goal._id,
    grade: goal.grade,
    numberClimbsToComplete: goal.numberClimbsToComplete,
    isCustom: goal.isCustom,
  }
})

// export const deleteUpdate = (cache, data) => {
//   // const projectData = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
//   const goalData = cache.readQuery({ query: GET_GOALS_FOR_PROJECT })
//   // console.log('projectData', projectData)
//   console.log('goalData', goalData)

//   const goalId = data.deleteGoal._id
//   // projectData.projects.goals = projectData.projects.goals.filter(goal => goal._id !== goalId)
//   goalData.goals = goalData.goals.filter(goal => goal._id !== goalId)

//   // cache.writeQuery({ query: GET_ALL_PROJECTS_DATA, data: { projects: projectData } })
//   cache.writeQuery({ query: GET_GOALS_FOR_PROJECT, data: { goals: goalData } })
// }

export const setGoalsMutations = (projectId, goals, isCustom, [add, edit, del]) => {
  return goals.forEach(goal => {
    if (goal._id && goal.isDeleted) {
      del({
        variables: { id: goal._id },
        optimisticResponse: optimisticResponse('delete', goal),
        // update: (cache, { data }) => deleteUpdate(cache, data)
      })
      return
    }

    const variables = {
      projectId,
      grade: reverseFormatGradeValue(goal.grade),
      numberClimbsToComplete: Number.parseInt(goal.numberClimbsToComplete),
      isCustom
    }

    if (goal._id) {
      edit({
        variables: { id: goal._id, ...variables },
        optimisticResponse: optimisticResponse('edit', goal)
      })
      return
    }
    add({ variables })
    return
  })
}

export const deleteAllGoals = (goals, del) => {
  return goals.forEach(goal =>
    del({ variables: { id: goal._id } })
  )
}

export const createPyramid = (projectGrade, projectId, addGoal) => {
  const NUM_CLIMBS = [2, 4, 3, 3]
  const index = GRADES.findIndex(grade => grade === projectGrade)

  for (let i = 0; i < 4; i++) {
    if (index - i - 1 < 0) break
    addGoal({
      variables: {
        projectId,
        grade: reverseFormatGradeValue(GRADES[index - i - 1]),
        numberClimbsToComplete: NUM_CLIMBS[i],
        isCustom: false
      }
    })
  }
}
