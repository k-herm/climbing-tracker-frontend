import { GET_ALL_PROJECTS_DATA } from './queries/project-data'

export const resolvers = {
  getLocalProjects: ({ cache }) => {
    const result = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
    if (result) {
      return result.projects
    }
    return false
  }
}
