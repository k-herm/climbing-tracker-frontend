import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Divider,
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
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import { GRADES } from '~/src/app/constants'

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
  flexContainer: {
    display: 'flex',
    padding: theme.spacing(1.4)
  },
  divider: {
    margin: '0 5px'
  }
}))

const EditablePitchesTable = ({ rowData, saveData, getIsInEdit }) => {
  const classes = useStyles()
  const [data, setData] = useState(rowData)
  const [edit, setEdit] = useState(new Array(length).fill(false))
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setData(rowData)
    setEdit(new Array(rowData.length).fill(false))
    getIsInEdit(false)
  }, [rowData])

  const handleChange = (index, key, value) =>
    setData(prevState => {
      const data = [...prevState]
      data[index][key] = value
      return data
    })


  const handleEditButton = (i) => {
    const editArr = [...edit]
    editArr[i] = !editArr[i]
    if (!editArr[i]) {
      if (!data[i].grade || !data[i].numberPitches) {
        setIsError(true)
        return
      }
      setIsError(false)
      saveData(data)
    }
    setEdit(editArr)
    editArr.includes(true) ? getIsInEdit(true) : getIsInEdit(false)
  }

  const handleDeleteButton = (i) => {
    setIsError(false)
    setData(prevState => {
      const data = [...prevState]
      data.splice(i, 1)
      saveData(data)
      return data
    })
  }


  const handleAddButton = () => {
    setData(prevState => [
      ...prevState,
      { grade: '', numberPitches: 1 }
    ])
    setEdit(prevState => [...prevState, false])
    getIsInEdit(true)
  }


  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} size="small" aria-label="pitches">
        <TableHead>
          <TableRow>
            <TableCell>Grade</TableCell>
            <TableCell>#Pitches</TableCell>
            <TableCell align="right" className={classes.flexContainer}>
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
          {isError &&
            <TableRow>
              <TableCell colSpan="3">
                <Typography variant="caption" color="error" align='center'>
                  Oops! Grade or number of pitches was left blank.
                </Typography>
              </TableCell>
            </TableRow>
          }
        </TableHead>

        <TableBody>
          {data.map((row, i) =>
            <TableRow key={i}>
              <TableCell>
                {edit[i] ?
                  <Select
                    value={data[i].grade}
                    onChange={e => handleChange(i, 'grade', e.target.value)}
                  >
                    {GRADES.map(grade =>
                      <MenuItem value={grade} key={grade}>{grade}</MenuItem>
                    )}
                  </Select>
                  : row.grade
                }
              </TableCell>
              <TableCell>
                {edit[i] ?
                  <TextField
                    inputProps={{
                      'aria-label': 'numberPitches',
                      'min': '1'
                    }}
                    value={data[i].numberPitches}
                    type="number"
                    onChange={e => handleChange(i, 'numberPitches', e.target.value)}
                  />
                  : row.numberPitches
                }
              </TableCell>
              <TableCell align="right" className={classes.flexContainer}>
                <IconButton
                  className={classes.button}
                  aria-label="edit pitch"
                  component="span"
                  onClick={() => handleEditButton(i)}
                >
                  {edit[i] ? <DoneIcon /> : <EditIcon />}
                </IconButton>
                <Divider orientation="vertical" className={classes.divider} flexItem />
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

EditablePitchesTable.propTypes = {
  data: PropTypes.array,
  getIsInEdit: PropTypes.func,
  saveData: PropTypes.func,
}

export default EditablePitchesTable