import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import PageModal from '~/components/pageModal'
import HeadlineCover from '~/components/headlineCover'
import DetailsCard from '~/components/projects/detailsCard'
import AttemptsCard from '~/components/projects/attemptsCard'
import GoalsCard from '~/components/projects/goals/GoalsCard'

import { useProjects } from '~/src/app/Hooks/useProjects'

const useStyles = makeStyles((theme) => ({
  transition: {
    duration: theme.transition.duration
  }
}));

const ProjectPage = () => {
  const classes = useStyles()
  const router = useRouter()

  const { getProject } = useProjects()

  const [openPage, setOpenPage] = useState(true)
  const [project, setProject] = useState(null)

  useEffect(() => {
    const project = getProject(router.query.id)
    if (project) {
      setProject(project)
      return
    }
    router.push('/projects')
  }, [router.query])

  const handleClose = () => {
    setOpenPage(false)
    setTimeout(
      () => router.push('/projects'),
      classes.transition.duration
    )
  }

  if (!project) return null

  return (
    <PageModal
      open={openPage}
      onClose={handleClose}
      title={project && project.name}
    >
      <HeadlineCover image="/mountain2.jpg">
        <DetailsCard data={project} />
        <AttemptsCard attempts={project.attempts} />
        <GoalsCard project={project} />
      </HeadlineCover>
    </PageModal>
  )
}

export default ProjectPage