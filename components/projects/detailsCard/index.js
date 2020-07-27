import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { useStyles } from './detailsCard-styles'

import { Card, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import ConfirmDialog from '~/components/confirmDialog'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { DELETE_PROJECT } from '~/src/app/Mutations/project'
import { GET_ALL_PROJECTS_DATA, GET_LOCAL_PROJECTS } from '~/src/app/Queries/projectData'

import { formatGradeValue } from '~/src/app/utils'


const DetailsCard = ({ data }) => {
  const classes = useStyles()
  const router = useRouter()
  const [anchorE1, setAnchorE1] = useState(null)

  const [deleteProject] = useMutation(DELETE_PROJECT)

  const numPitches = data.pitches.reduce((arr, curr) => arr + curr.numberPitches, 0)
  const pitchString = numPitches > 1 ? 'Pitches' : 'Pitch'

  const handleOpenMenu = (event) => setAnchorE1(event.currentTarget)
  const handleCloseMenu = (event) => setAnchorE1(null)

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
      update: (cache, { data }) => {
        const projects = cache.readQuery({ query: GET_ALL_PROJECTS_DATA })
        projects.projects = projects.projects.filter(project => project._id !== data.deleteProject._id)
        cache.writeQuery({ query: GET_ALL_PROJECTS_DATA, data: projects })
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteProject: {
          __typename: 'Project',
          ...data
        }
      }
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
    console.log("Archive")
  }

  if (!data) return null
  return (
    <Card className={classes.card}>
      {
        data.completedDate &&
        <Card className={classes.complete}>
          <Typography variant="h5" color="primary">
            <CheckCircleOutlineIcon fontSize="large" className={classes.check} /> Completed!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(data.completedDate).toDateString()}
          </Typography>
        </Card>
      }
      <Grid
        className={classes.container}
        container
        alignItems="flex-end"
        justify="flex-start"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h1" className={classes.grade}>
            {formatGradeValue(data.grade)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.marginLeft}>
            {data.climbStyle}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.container}
        justify="space-between"
      >
        <Grid item>
          <Typography variant="body1" className={classes.marginLeft} color="textSecondary">
            {data.location && `${data.location} | `}
            {`${numPitches} ${pitchString}`}
            {data.totalLength && ` | ${data.totalLength} m`}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton
            className={classes.menuButton}
            aria-label="edit project details"
            variant="contained"
            size="small"
            onClick={handleOpenMenu}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id='projectActions'
            anchorEl={anchorE1}
            anchorOrigin={{
              vertical: 'bottom', horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top', horizontal: 'center'
            }}
            getContentAnchorEl={null}
            open={Boolean(anchorE1)}
            onClose={handleCloseMenu}
          >
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={handleDeleteOnClick}>Delete</MenuItem>
            <MenuItem onClick={handleArchiveOnClick}>Archive</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogOnClose}
        onConfirm={handleDeleteDialogOnConfirm}
        title="Delete Project"
        text={`Are you sure you want to permanently delete your project "${data.name}"?`}
        submitTitle="Delete"
      />
      <ConfirmDialog
        open={isArchiveDialogOpen}
        onClose={handleArchiveDialogOnClose}
        onConfirm={handleArchiveDialogOnConfirm}
        title="Archive Project"
        text={`Are you sure you want to archive your project "${data.name}"?`}
        submitTitle="Archive"
      />
    </Card>
  )
}

DetailsCard.propTypes = {
  data: PropTypes.object
}
export default DetailsCard