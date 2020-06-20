import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { Box, Card, LinearProgress, Typography } from '@material-ui/core'

import Header from '~/components/header'
import NetworkError from '~/components/networkError'
import ClickableList from '~/components/clickableList'
import HeadlineCover from '~/components/headlineCover'

import { useProjects } from '~/src/app/Hooks/useProjects'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/Queries/projectData'
import { formatGradeValue } from '~/src/app/utils'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '70vh'
  },
  container: {
    marginBottom: theme.page.navHeight
  },
  headline: {
    margin: '3rem',
    fontStyle: 'italic'
  }
}))

const Projects = () => {
  const { setProjects } = useProjects()
  const { card, container, headline } = useStyles()
  const { loading, data, error } = useQuery(GET_ALL_PROJECTS_DATA)

  useEffect(() => {
    if (data && data.projects.length) {
      setProjects(data.projects)
    }
  }, [data])

  if (error) {
    return <NetworkError />
  }

  return (
    <Box className={container}>
      <Header title='Projects' />

      {loading && <Box><LinearProgress /></Box>}
      <HeadlineCover image="/yosemite.jpg">
        {data ?
          (data.projects.length ?
            <ClickableList
              listItems={data.projects.map(project => ({
                primary: project.name,
                secondary: `${formatGradeValue(project.grade)} - Number of Goals:
                ${project.goals.reduce((acc, curr) => acc + curr.numberClimbsToComplete, 0)}`,
                id: project._id
              }))}
            />
            :
            <Card className={card}>
              <Typography
                className={headline}
                align="center"
                variant="h4"
                color="textSecondary"
              >
                Let's start a project!
            </Typography>
            </Card>)
          : <></>
        }
      </HeadlineCover>
    </Box>
  )
}

export default Projects