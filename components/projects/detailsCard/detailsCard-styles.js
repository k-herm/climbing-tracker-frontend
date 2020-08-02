import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    paddingTop: props => props.hasStatus ? `${theme.spacing(3)}px` : '',
    display: 'grid',
    justifyItems: 'center',
  },
  container: {
    margin: `${theme.spacing(1)}px 0`
  },
  grade: {
    fontWeight: 400,
    lineHeight: 0.85,
  },
  marginLeft: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    right: theme.spacing(1),
  }
}))