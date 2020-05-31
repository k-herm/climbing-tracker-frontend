import { reverseFormatGradeValue } from '~/src/app/utils'
import { GRADES } from '~/src/app/constants'

export const setGoalsMutations = (goals, isCustom, add, edit, del) => {
  return goals.forEach(goal => {
    if (goal._id && goal.isDeleted) {
      del({ variables: { id: goal._id } })
      return
    }

    const variables = {
      projectId: projectData._id,
      grade: reverseFormatGradeValue(goal.grade),
      numberClimbsToComplete: Number.parseInt(goal.numberClimbsToComplete),
      isCustom
    }

    if (goal._id) {
      edit({ variables: { id: goal._id, ...variables } })
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