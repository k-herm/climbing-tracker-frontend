import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles({
  container: {
    width: '100%'
  }
})

const NavList = ({ listItems }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <List component="nav" aria-label="list">
        {listItems.map((listItem, i) =>
          <Paper key={i}>
            <ListItem button onClick={listItem.onClick}>
              <ListItemText
                primary={listItem.primary}
                secondary={listItem.secondary}
              />
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </Paper>
        )}
      </List>
    </Box>
  )
}

NavList.propTypes = {
  listItems: PropTypes.array
}

export default NavList