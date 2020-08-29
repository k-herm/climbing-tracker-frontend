import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import GradeSelect from './grade-select'

const useStyles = makeStyles(theme => ({
  container: {
    margin: '2rem 0'
  },
  button: {
    padding: 0
  },
  table: {
    width: '100%',
  },
  tableCell: {
    maxWidth: 200,
    '& input[type="number"]': {
      maxWidth: 150
    }
  },
}))

const PitchesTable = ({ rowData, saveData }) => {
  const classes = useStyles()
  const [data, setData] = useState(rowData)

  useEffect(() => setData(rowData), [rowData])

  const handleChange = (index, key, value) =>
    setData(prevState => {
      const data = [...prevState]
      data[index][key] = value
      saveData(data)
      return data
    })

  const handleDeleteButton = (i) => {
    setData(prevState => {
      const data = [...prevState]
      data.splice(i, 1)
      saveData(data)
      return data
    })
  }

  const handleAddButton = () =>
    setData(prevState => [
      ...prevState,
      { grade: '', numberPitches: 1 }
    ])

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} size="small" aria-label="pitches">
        <TableHead>
          <TableRow>
            <TableCell>Grade</TableCell>
            <TableCell># Pitches</TableCell>
            <TableCell align="right">
              <IconButton
                className={classes.button}
                color="primary"
                aria-label="add pitch"
                component="span"
                onClick={handleAddButton}
              >
                <AddCircleIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, i) =>
            <TableRow key={i}>
              <TableCell className={classes.tableCell}>
                <GradeSelect
                  noLabel
                  initialState={data[i].grade}
                  updateState={e => handleChange(i, 'grade', e.target.value)}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TextField
                  inputProps={{
                    'aria-label': 'numberPitches',
                    'min': '1'
                  }}
                  value={data[i].numberPitches}
                  type="number"
                  onChange={e => handleChange(i, 'numberPitches', e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  className={classes.button}
                  aria-label="delete pitch"
                  component="span"
                  onClick={() => handleDeleteButton(i)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

PitchesTable.propTypes = {
  data: PropTypes.array,
  saveData: PropTypes.func,
}

export default PitchesTable