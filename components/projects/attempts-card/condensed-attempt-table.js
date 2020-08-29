import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import CustomDatePicker from '../../form-components/custom-date-picker'

import { useAttemptTable } from './use-attempt-table'

const useStyles = makeStyles(theme => ({
  button: {
    padding: 0
  },
  container: {
    margin: `${theme.spacing(2)}px 0`,
  },
  select: {
    width: '100%'
  },
  tableHead: {
    fontWeight: 'bold'
  },
  headerRow: {
    '& > .MuiTableCell-sizeSmall': {
      paddingRight: theme.spacing(0.5),
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    }
  },
  itemRow: {
    '& > .MuiTableCell-sizeSmall': {
      paddingRight: theme.spacing(0.5),
      borderBottom: 'none'
    }
  },
  lastRow: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    '& > .MuiTableCell-sizeSmall': {
      paddingBottom: theme.spacing(2)
    }
  },
  iconCell: {
    padding: theme.spacing(1)
  }
}))

const CondensedAttemptTable = ({ attempts, setAttempts }) => {
  const classes = useStyles()

  const {
    handleChange,
    handleAdd,
    handleDelete,
    isError
  } = useAttemptTable(attempts, setAttempts)

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table size="small" aria-label="attempts-table-condensed">
        <TableHead>
          <TableRow className={classes.headerRow}>
            {isError &&
              <TableCell align="left" colSpan="2">
                <Typography variant="caption" color="error" align='center'>
                  Oops! Cannot contain duplicate entries.
                  </Typography>
              </TableCell>
            }
            <TableCell align="right" colSpan={isError ? '1' : '3'}>
              <IconButton
                className={classes.button}
                color="primary"
                aria-label="add goal"
                component="span"
                onClick={handleAdd}
              >
                <AddCircleIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {attempts.map((attempt, i) =>
            <Fragment key={i}>
              <TableRow className={classes.itemRow}>
                <TableCell align="left" className={classes.tableHead}>
                  Date
                </TableCell>
                <TableCell>
                  <CustomDatePicker
                    initialState={attempt.date}
                    updateState={value => handleChange(i, 'date', value)}
                  />
                </TableCell>
                <TableCell align="center" rowSpan="3" className={classes.iconCell}>
                  <IconButton
                    className={classes.button}
                    aria-label="delete goal"
                    component="span"
                    onClick={() => handleDelete(i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow className={classes.itemRow}>
                <TableCell align="left" className={classes.tableHead}>
                  Attempt
                </TableCell>
                <TableCell>
                  <Select
                    className={classes.select}
                    labelId="select-attempt-type"
                    value={attempt.attemptType}
                    name="attemptType"
                    onChange={e => handleChange(i, 'attemptType', e.target.value)}
                  >
                    <MenuItem value="redpoint">Redpoint</MenuItem>
                    <MenuItem value="topRope">Top Rope</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow className={`${classes.itemRow} ${classes.lastRow}`}>
                <TableCell align="left" className={classes.tableHead}>
                  # Tries
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    className={classes.textField}
                    name="numberOfAttempts"
                    inputProps={{
                      'aria-label': 'numberOfAttempts',
                      'min': '1'
                    }}
                    value={attempt.numberOfAttempts}
                    type="number"
                    onChange={e => handleChange(i, 'numberOfAttempts', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

CondensedAttemptTable.propTypes = {
  attempts: PropTypes.array,
  setattempts: PropTypes.func
}

CondensedAttemptTable.defaultProps = {
  attempts: []
}

export default CondensedAttemptTable