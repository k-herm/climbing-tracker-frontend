import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { GET_ALL_PROJECTS_DATA } from '~/src/app/queries/project-data'

import { DELETE_PROJECT, EDIT_PROJECT } from '~/src/app/mutations/project'
import { getOptimisticResponseObject, deleteOne } from '~/src/app/mutations/cache'

import { reverseFormatGradeValue, getDateString } from '~/src/app/utils'

export const useDialogController = (handleCloseMenu, openSuccessNotification, data) => {
  const router = useRouter()

  const [deleteProject] = useMutation(DELETE_PROJECT)
  const [editProject] = useMutation(EDIT_PROJECT)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const handleDeleteOnClick = () => {
    setIsDeleteDialogOpen(true)
    handleCloseMenu()
  }
  const handleDeleteDialogOnClose = () => setIsDeleteDialogOpen(false)
  const handleDeleteDialogOnConfirm = () => {
    setIsDeleteDialogOpen(false)
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

  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)
  const handleArchiveOnClick = () => {
    setIsArchiveDialogOpen(true)
    handleCloseMenu()
  }
  const handleArchiveDialogOnClose = () => setIsArchiveDialogOpen(false)
  const handleArchiveDialogOnConfirm = () => {
    setIsArchiveDialogOpen(false)
    editProject({
      variables: { id: data._id, isArchived: true }
    })
    router.push('/projects')
  }

  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)
  const handleCompleteOnClick = () => {
    setIsCompleteDialogOpen(true)
    handleCloseMenu()
  }
  const handleCompleteDialogOnClose = () => setIsCompleteDialogOpen(false)
  const handleCompleteDialogOnConfirm = () => {
    setIsCompleteDialogOpen(false)
    editProject({
      variables: { id: data._id, completedDate: getDateString(new Date()) },
    })
    openSuccessNotification()
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const handleEditOnClick = () => {
    setIsEditDialogOpen(true)
    handleCloseMenu()
  }
  const handleEditDialogOnClose = () => setIsEditDialogOpen(false)
  const handleEditDialogOnConfirm = (state) => {
    setIsEditDialogOpen(false)
    const variables = { ...state }
    variables.grade = reverseFormatGradeValue(variables.grade)
    variables.pitches = variables.pitches.map(pitch => ({
      grade: reverseFormatGradeValue(pitch.grade),
      numberPitches: Number.parseInt(pitch.numberPitches)
    }))

    editProject({
      variables: { id: data._id, ...variables }
    })
  }

  return {
    isDeleteDialogOpen,
    handleDeleteOnClick,
    handleDeleteDialogOnClose,
    handleDeleteDialogOnConfirm,

    isArchiveDialogOpen,
    handleArchiveOnClick,
    handleArchiveDialogOnClose,
    handleArchiveDialogOnConfirm,

    isCompleteDialogOpen,
    handleCompleteOnClick,
    handleCompleteDialogOnClose,
    handleCompleteDialogOnConfirm,

    isEditDialogOpen,
    handleEditOnClick,
    handleEditDialogOnClose,
    handleEditDialogOnConfirm,
  }
}