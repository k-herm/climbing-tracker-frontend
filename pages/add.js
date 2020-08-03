import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import FullScreenFormModal from '~/components/formComponents/fullScreenFormModal'
import AddClimbForm from '~/components/dashboard/addClimbForm'
import AddProjectForm from '~/components/projects/addProjectForm'

const useStyles = makeStyles((theme) => ({
  transition: {
    duration: theme.transition.duration
  }
}));

const AddItem = () => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(true)
  const router = useRouter()

  const page = router.query.page
  const [item, setItem] = useState(null)

  useEffect(() => {
    switch (page) {
      case 'dashboard': return setItem('climb')
      case 'projects': return setItem('project')
      case 'journal': return setItem('journal entry')
      default: return setItem(null)
    }
  }, [page])

  const handleOnClose = () => {
    setModalOpen(false)
    setTimeout(
      () => router.push(`/${page}`),
      classes.transition.duration
    )
  }

  const formPicker = {
    dashboard: <AddClimbForm onClose={handleOnClose} />,
    projects: <AddProjectForm onClose={handleOnClose} />
  }

  return (
    <FullScreenFormModal
      appBarTitle={`Add ${item}`}
      open={modalOpen}
      onClose={handleOnClose}
      title={`Enter a ${item}`}
      formContent={formPicker[page]}
    />
  )
}

export default AddItem