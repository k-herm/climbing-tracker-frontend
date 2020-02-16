import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    '& h2': {
      color: theme.palette.primary.dark,
      textAlign: 'center'
    },
    '& button': {
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: '100%'
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
        spacing={1}
      >
        <h2>{title}</h2>
        {children}
      </Grid>
    </Paper>
  )
}

export default FormContainer