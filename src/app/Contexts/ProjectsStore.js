import { createContext, useState } from 'react'

export const ProjectsContext = createContext({
  projects: [],
  setProjects: () => { }
})

export const ProjectsStore = ({ children }) => {
  const setProjects = (projects) =>
    setUserProjects(prevState => ({
      ...prevState,
      projects: [...projects]
    }))

  const [userProjects, setUserProjects] = useState({
    projects: [],
    setProjects: setProjects
  })

  return (
    <ProjectsContext.Provider value={userProjects}>
      {children}
    </ProjectsContext.Provider>
  )
}
