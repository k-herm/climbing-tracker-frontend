import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Chip } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/styles'

import { CLIMB_STYLES } from '~/src/app/constants'

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chipStyle: {
    margin: theme.spacing(0.5),
  }
}))

const fixRouteStylesEnum = (style) => {
  if (style) {
    return style[0].toLowerCase().concat(style.substr(1).replace('-', ''))
  }
}

const ClimbStyleChipFilter = ({ updateState }) => {
  const { chipContainer, chipStyle } = useStyles()

  const [chips, setChips] = useState(new Array(CLIMB_STYLES.length).fill(false))

  const handleFilter = () => {
    const selectedRouteStyles = CLIMB_STYLES.reduce((arr, curr, i) => {
      if (chips[i]) arr.push(fixRouteStylesEnum(curr))
      return arr
    }, [])
    updateState(selectedRouteStyles)
  }

  return (
    <Box className={chipContainer}>
      {CLIMB_STYLES.map((style, i) =>
        <li key={i}>
          <Chip
            label={style}
            size="small"
            clickable
            color="primary"
            className={chipStyle}
            onClick={() => setChips(prevState => {
              const data = [...prevState]
              data[i] = !prevState[i]
              return data
            })}
            icon={<DoneIcon />}
            variant={chips[i] ? "default" : "outlined"}
          />
        </li>
      )}
      <li key={CLIMB_STYLES.length}>
        <Chip
          label="Apply Filter"
          size="small"
          clickable
          color="secondary"
          className={chipStyle}
          onClick={handleFilter}
        />
      </li>
    </Box>
  )
}

ClimbStyleChipFilter.propTypes = {
  updateState: PropTypes.func
}

export default ClimbStyleChipFilter