import React, { useContext } from 'react'
import { Box, Container, LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'

// import { UserContext } from '../src/app/UserStore'
import Header from '~/components/header'
// import ProjectList from '~/components/projects/projectList'
import NavList from '~/components/navList'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/Queries/projectData'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.page.navHeight
  }
}))

const Projects = () => {
  const { container } = useStyles()
  // const { id, name } = useContext(UserContext)
  const { loading, data, error } = useQuery(GET_ALL_PROJECTS_DATA)

  console.log(data)
  if (error) {
    return <NetworkError />
  }

  return (
    <Box className={container}>
      <Header title='Projects' />
      {loading && <Box><LinearProgress /></Box>}
      <Container maxWidth="sm">
        {data &&
          <NavList
            listItems={data.projects.map(project => ({
              primary: project.name,
              secondary: `${formatGradeValue(project.grade)} - Completed Goals: ${
                project.goals.reduce((acc, curr) => acc + curr.climbsCompleted.length, 0)
                }/${project.goals.reduce((acc, curr) => acc + curr.numberClimbsToComplete, 0)}`,
              onClick: () => console.log('hello')
            }))}
          />
        }
      </Container>
    </Box>
  )
}

export default Projects