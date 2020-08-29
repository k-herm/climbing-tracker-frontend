import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.custom.creme,
    '&[disabled]': {
      backgroundColor: theme.custom.creme
    }
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    width: '100px',
    height: '75px'
  }
}))

const ClimbDataButton = ({ disabled, climbName, grade, onClick }) => {
  const { container, button } = useStyles()
  const EMPTY = '__________'

  return (
    <Button
      variant="contained"
      className={button}
      onClick={onClick}
      disabled={disabled}
    >
      <Box className={container}>
        <Typography variant="h6" color="secondary">{grade}</Typography>
        {!disabled ?
          <CheckCircleOutlineIcon fontSize="large" color="primary" /> :
          <>
            <Typography variant="body2" noWrap={true}>{climbName || EMPTY}</Typography>
            {!climbName && <Typography variant="caption">{EMPTY}</Typography>}
          </>
        }
      </Box>
    </Button >
  )
}

ClimbDataButton.propTypes = {
  disabled: PropTypes.bool,
  grade: PropTypes.string,
  climbName: PropTypes.string,
  onClick: PropTypes.func
}

export default ClimbDataButton

