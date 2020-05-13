import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
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

const ClickableList = ({ listItems }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <List component="nav" aria-label="list">
        {listItems.map((listItem, i) =>
          <Paper key={i}>
            <Link
              href={{ pathname: "/projects/[pid]", query: { id: listItem.id } }}
              as={`/projects/${listItem.primary}?id=${listItem.id}`}
            >
              <ListItem button>
                <ListItemText
                  primary={listItem.primary}
                  secondary={listItem.secondary}
                />
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItem>
            </Link>
            <Divider />
          </Paper>
        )}
      </List>
    </Box>
  )
}

ClickableList.propTypes = {
  listItems: PropTypes.array
}

export default ClickableList