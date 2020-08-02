import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/Queries/projectData'

import { DELETE_PROJECT, EDIT_PROJECT } from '~/src/app/Mutations/project'
import { getOptimisticResponseObject, deleteOne } from '~/src/app/Mutations/cache'

export const useDialogController = (handleOpenMenu, handleCloseMenu, data) => {
  const router = useRouter()

  const [deleteProject] = useMutation(DELETE_PROJECT)
  const [editProject] = useMutation(EDIT_PROJECT)

  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false)
  const handleDeleteOnClick = () => {
    setisDeleteDialogOpen(true)
    handleCloseMenu()
  }
  const handleDeleteDialogOnClose = () => setisDeleteDialogOpen(false)
  const handleDeleteDialogOnConfirm = () => {
    setisDeleteDialogOpen(false)
    deleteProject({
      variables: { id: data._id },
      update: (cache, { data }) => deleteOne(
        cache,
        GET_ALL_PROJECTS_DATA,
        { id: data.deleteProject._id, type: 'projects' }
      ),
      optimisticResponse: getOptimisticResponseObject('deleteProject', 'Project', data)
    })
    router.push('/projects')
  }

  const [isArchiveDialogOpen, setisArchiveDialogOpen] = useState(false)
  const handleArchiveOnClick = () => {
    setisArchiveDialogOpen(true)
    handleCloseMenu()
  }
  const handleArchiveDialogOnClose = () => setisArchiveDialogOpen(false)
  const handleArchiveDialogOnConfirm = () => {
    setisArchiveDialogOpen(false)
    editProject({
      variables: { id: data._id, isArchived: true }
    })
    router.push('/projects')
  }

  return {
    isDeleteDialogOpen,
    handleDeleteOnClick,
    handleDeleteDialogOnClose,
    handleDeleteDialogOnConfirm,

    isArchiveDialogOpen,
    handleArchiveOnClick,
    handleArchiveDialogOnClose,
    handleArchiveDialogOnConfirm
  }
}