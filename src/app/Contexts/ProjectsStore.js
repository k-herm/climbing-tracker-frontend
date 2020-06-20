import { createContext, useReducer } from 'react'

export const ProjectsContext = createContext()

// return immutable object to trigger re-render (on state changes)
// return state for selectors (does not re-render)

const setGoalData = (state, payload) => {
  const project = state.projects.find(project => project._id === payload.projectId)
  project.goals = [...payload.goals]
  return { projects: [...state.projects] }
}


const initialState = { projects: [] }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_PROJECTS':
      return { projects: [...payload] }
    case 'SET_GOAL_DATA':
      return setGoalData(state, payload)
    case 'ADD_GOAL':
    case 'DELETE_GOAL':
    case 'UPDATE_GOAL':
    case 'CLEAR_ALL_GOALS':
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
