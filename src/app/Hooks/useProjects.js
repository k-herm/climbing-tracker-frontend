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

  const getProject = (projectId) => dispatch({
    type: 'GET_PROJECT_DATA',
    payload: projectId
  })

  return {
    state,
    setProjects,
    setGoals,
    getProject,
  }
}