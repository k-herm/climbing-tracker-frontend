import { useContext, useState, useEffect } from 'react'
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

  const getProject = (projectId) => state.projects.find(project => project._id === projectId)

  const getGoals = (projectId) => {
    const project = getProject(projectId)
    return project.goals
  }

  return {
    state,
    setProjects,
    setGoals,
    getProject,
    getGoals
  }
}