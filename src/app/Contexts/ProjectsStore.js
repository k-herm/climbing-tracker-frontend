import { createContext, useReducer } from 'react'

export const ProjectsContext = createContext()

// return immutable object to trigger re-render (on state changes)
// return state for selectors (does not re-render)

const getImmutableState = (state, projectId) => {
  const newState = [...state.projects]
  const project = newState.find(project => project._id === projectId)
  return [newState, project]
}

const setGoalData = (state, payload) => {
  const [newState, project] = getImmutableState(state, payload.projectId)
  project.goals = [...payload.goals]
  return { projects: [...newState] }
}

const addGoal = (state, payload) => {
  const [newState, project] = getImmutableState(state, payload.projectId)
  project.goals.push(payload.goal)
  return { projects: [...newState] }
}

const editGoal = (state, payload) => {
  const [newState, project] = getImmutableState(state, payload.projectId)
  project.goals[payload.index][payload.key] = payload.value
  return { projects: [...newState] }
}

const deleteGoal = (state, payload) => {
  const [newState, project] = getImmutableState(state, payload.projectId)
  project.goals[payload.index].isDeleted = true
  return { projects: [...newState] }
}

const clearGoals = (state, payload) => {
  const [newState, project] = getImmutableState(state, payload)
  project.goals = []
  console.log("NEWESATATE", newState)
  return { projects: [...newState] }
}

const initialState = { projects: [] }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_PROJECTS':
      return { projects: [...payload] }
    case 'SET_GOAL_DATA':
      return setGoalData(state, payload)
    case 'ADD_GOAL':
      return addGoal(state, payload)
    case 'DELETE_GOAL':
      return deleteGoal(state, payload)
    case 'EDIT_GOAL':
      return editGoal(state, payload)
    case 'CLEAR_GOALS':
      return clearGoals(state, payload)
    default:
      throw new Error('ProjectContext Error: Not recognized action type')
  }
}

export const ProjectsStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProjectsContext.Provider value={[state, dispatch]}>
      {children}
    </ProjectsContext.Provider>
  )
}
