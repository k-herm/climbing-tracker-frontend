import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'

import PageModal from '~/components/PageModal'
import HeadlineCover from '~/components/headlineCover'
import DetailsCard from '~/components/projects/detailsCard'

const useStyles = makeStyles((theme) => ({
  transition: {
    duration: theme.transition.duration
  }
}));

const ProjectPage = () => {
  const classes = useStyles()
  const router = useRouter()
  console.log(router.query);
  const [openPage, setOpenPage] = useState(true)

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
      title={"HELLLLOOOOOO"}
    >
      <HeadlineCover image="/mountain2.jpg">
        {/* <DetailsCard data={data} /> */}
      </HeadlineCover>
    </PageModal>
  )
}

export default ProjectPage