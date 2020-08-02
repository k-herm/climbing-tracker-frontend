import { useState } from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './detailsCard-styles'

import { Card, Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ConfirmDialog from '~/components/confirmDialog'

import { useDialogController } from './useDialogController'
import { formatGradeValue } from '~/src/app/utils'

const DetailsCard = ({ data }) => {
  const classes = useStyles({ hasStatus: !!data.completedDate })
  const [anchorE1, setAnchorE1] = useState(null)

  const numPitches = data.pitches.reduce((arr, curr) => arr + curr.numberPitches, 0)
  const pitchString = numPitches > 1 ? 'Pitches' : 'Pitch'

  const handleOpenMenu = (event) => setAnchorE1(event.currentTarget)
  const handleCloseMenu = (event) => setAnchorE1(null)
  const dialogController = useDialogController(handleOpenMenu, handleCloseMenu, data)

  if (!data) return null
  return (
    <Card className={classes.card}>
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
            <MenuItem>Mark Complete</MenuItem>
            <Divider />
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={dialogController.handleDeleteOnClick}>Delete</MenuItem>
            <MenuItem onClick={dialogController.handleArchiveOnClick}>Archive</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={dialogController.isDeleteDialogOpen}
        onClose={dialogController.handleDeleteDialogOnClose}
        onConfirm={dialogController.handleDeleteDialogOnConfirm}
        title="Delete Project"
        text={`Are you sure you want to permanently delete your project "${data.name}"?`}
        submitTitle="Delete"
      />
      <ConfirmDialog
        open={dialogController.isArchiveDialogOpen}
        onClose={dialogController.handleArchiveDialogOnClose}
        onConfirm={dialogController.handleArchiveDialogOnConfirm}
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