import { useContext } from 'react'
import { ProjectsContext } from '../Contexts/ProjectsStore'

export const useProjects = () => {
  const [state, dispatch] = useContext(ProjectsContext)

  const setProjects = (projects) => dispatch({
    type: 'SET_PROJECTS',
    payload: projects
  })

  const setGoals = (projectId, goals) => dispatch({
    type: 'SET_GOAL_DATA',
    payload: { projectId, goals }
  })

  const addGoal = (projectId, goal) => dispatch({
    type: 'ADD_GOAL',
    payload: { projectId, goal }
  })

  const editGoal = (projectId, index, key, value) => dispatch({
    type: 'EDIT_GOAL',
    payload: { projectId, index, key, value }
  })

  const deleteGoal = (projectId, index) => dispatch({
    type: 'DELETE_GOAL',
    payload: { projectId, index }
  })

  const clearGoals = (projectId) => dispatch({
    type: 'CLEAR_GOALS',
    payload: projectId
  })

  const getProject = (projectId) =>
    state.projects.find(project => project._id === projectId)

  const getGoals = (projectId) => {
    const project = state.projects.find(project => project._id === projectId)
    return project.goals
  }

  return {
    setProjects,
    setGoals,
    addGoal,
    editGoal,
    deleteGoal,
    clearGoals,
    getProject,
    getGoals
  }
}