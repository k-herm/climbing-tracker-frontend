import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0.5),
    '& h2': {
      color: theme.palette.primary.dark,
      textAlign: 'center'
    },
    '& button': {
      padding: theme.spacing(2),
      marginTop: theme.spacing(3),
      width: '100%'
    }
  },
  grid: {
    '& .MuiGrid-item': {
      margin: '1rem'
    }
  }
}))

const FormContainer = ({
  children,
  title,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justify="center"
        direction="column"
        className={classes.grid}
      >
        <h2>{title}</h2>
        {children}
      </Grid>
    </Paper>
  )
}

FormContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default FormContainer