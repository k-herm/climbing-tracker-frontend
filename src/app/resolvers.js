import { GET_ALL_PROJECTS_DATA } from './Queries/projectData'

export const resolvers = {
  getLocalProjects: ({ cache }) => {
    const result = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
    if (result) {
      return result.projects
    }
    return false
  }
}
