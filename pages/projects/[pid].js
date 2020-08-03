import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'

import PageModal from '~/components/pageModal'
import Notification from '~/components/notification'
import HeadlineCover from '~/components/headlineCover'
import StatusCard from '~/components/projects/statusCard'
import DetailsCard from '~/components/projects/detailsCard'
import AttemptsCard from '~/components/projects/attemptsCard'
import GoalsCard from '~/components/projects/goals/GoalsCard'

import { GET_LOCAL_PROJECTS } from '~/src/app/Queries/projectData'

const useStyles = makeStyles((theme) => ({
  transition: {
    duration: theme.transition.duration
  }
}));

const ProjectPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { data } = useQuery(GET_LOCAL_PROJECTS)

  const [openPage, setOpenPage] = useState(true)
  const [currentProject, setCurrentProject] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (data && data.projects.length && router.query) {
      setCurrentProject(data.projects.find(project =>
        project._id.toString() === router.query.id
      ))
    } else {
      router.push('/projects')
    }
  }, [data, router.query])

  const handleClose = () => {
    setOpenPage(false)
    setTimeout(
      () => router.push('/projects'),
      classes.transition.duration
    )
  }

  if (!currentProject) return <></>
  return (
    <PageModal
      open={openPage}
      onClose={handleClose}
      title={currentProject.name}
    >
      <Notification
        id="climbCompleted"
        open={isComplete}
        message="🥳 Congratulations on sending your project! Time to celebrate! 🎉"
        severity="success"
      />
      <HeadlineCover image="/mountain2.jpg">
        <StatusCard data={currentProject} />
        <DetailsCard data={currentProject} openNotification={() => setIsComplete(true)} />
        <AttemptsCard projectData={currentProject} />
        <GoalsCard project={currentProject} />
      </HeadlineCover>
    </PageModal>
  )
}

export default ProjectPage