import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    '& h2': {
      color: theme.palette.primary.dark,
      textAlign: 'center'
    }
  },
  button: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  }
}))

const FormContainer = ({
  children,
  title,
  method,
  onSubmit,
  submitTitle
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <form method={method} onSubmit={onSubmit}>
        <Grid
          container
          justify="center"
          direction="column"
          spacing={1}
        >
          <h2>{title}</h2>
          {children}
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            {submitTitle}
          </Button>
        </Grid>
      </form>
    </Paper>
  )
}

export default FormContainer