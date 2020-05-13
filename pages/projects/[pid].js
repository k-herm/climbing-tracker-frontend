import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import PageModal from '~/components/PageModal'
import HeadlineCover from '~/components/headlineCover'
import DetailsCard from '~/components/projects/detailsCard'

import { ProjectsContext } from '~/src/app/Contexts/ProjectsStore'

const useStyles = makeStyles((theme) => ({
  transition: {
    duration: theme.transition.duration
  }
}));

const ProjectPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { projects } = useContext(ProjectsContext)
  const [openPage, setOpenPage] = useState(true)
  const [currentProject, setCurrentProject] = useState(null)

  useEffect(() => {
    if (projects.length && router.query) {
      setCurrentProject(projects.find(project =>
        project._id.toString() === router.query.id
      ))
    }
    if (!projects.length && router.query) {
      router.push('/projects')
    }
  }, [projects, router.query])

  const handleClose = () => {
    setOpenPage(false)
    setTimeout(
      () => router.push('/projects'),
      classes.transition.duration
    )
  }

  return (
    <PageModal
      open={openPage}
      onClose={handleClose}
      title={currentProject ? currentProject.name : ''}
    >
      {/* <HeadlineCover image="/mountain2.jpg">
            <DetailsCard data={} />
          </HeadlineCover> */}
    </PageModal>
  )
}

export default ProjectPage