import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  CardMedia,
  Container
} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    zIndex: 2,
    marginTop: '-10%'
  },
  emptySpace: {
    height: '20vh'
  },
  media: {
    width: '100%'
  }
})

const HeadlineCover = ({ children, image }) => {
  const { card, emptySpace, media } = useStyles()
  return (
    <Box>
      <CardMedia className={media} image={image}>
        <Box className={emptySpace}></Box>
      </CardMedia>
      <Container maxWidth="md" className={card}>
        {children}
      </Container>
    </Box>
  )
}

export default HeadlineCover
