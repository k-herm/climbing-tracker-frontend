import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    display: 'grid',
    justifyItems: 'center',
    overflow: 'visible',
  },
  container: {
    margin: `${theme.spacing(1)}px 0`
  },
  complete: {
    margin: 0,
    padding: theme.spacing(1),
    position: 'relative',
    top: `-${theme.spacing(6)}px`,
    border: `2px solid ${theme.palette.primary.main}`,
    width: '70%',
    display: 'grid',
    justifyItems: 'center',
    gridGap: theme.spacing(1),
  },
  check: {
    verticalAlign: 'bottom'
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