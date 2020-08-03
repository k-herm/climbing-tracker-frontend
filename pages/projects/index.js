import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { Box, Card, LinearProgress, Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'

import Header from '~/components/header'
import NetworkError from '~/components/networkError'
import ClickableList from '~/components/clickableList'
import HeadlineCover from '~/components/headlineCover'

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
  },
  icon: {
    verticalAlign: 'bottom'
  }
}))

const Projects = () => {
  const { card, container, headline, icon } = useStyles()
  const { loading, data, error } = useQuery(GET_ALL_PROJECTS_DATA)

  const ProjectLists = () => {
    const getDataDisplay = (project) => ({
      primary:
        <Typography>
          {project.name} {project.completedDate && <DoneIcon className={icon} color="primary" />}
        </Typography>,
      secondary: `${formatGradeValue(project.grade)} - Number of Goals:
        ${project.goals.reduce((acc, curr) => acc + curr.numberClimbsToComplete, 0)}`,
      id: project._id
    })
    return (
      <>
        <ClickableList
          listItems={data.projects
            .filter(project => !project.isArchived)
            .map(project => getDataDisplay(project))
          }
        />
        <Typography align="center" color="textSecondary">
          Archived Projects
        </Typography>
        <ClickableList
          listItems={data.projects
            .filter(project => project.isArchived)
            .map(project => getDataDisplay(project))
          }
        />
      </>
    )
  }

  if (error) {
    return <NetworkError />
  }

  return (
    <Box className={container}>
      <Header title='Projects' />

      {loading && <Box><LinearProgress /></Box>}
      <HeadlineCover image="/yosemite.jpg">
        {!data && <></>}
        {data && data.projects.length ?
          <ProjectLists />
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
          </Card>
        }
      </HeadlineCover>
    </Box>
  )
}

export default Projects