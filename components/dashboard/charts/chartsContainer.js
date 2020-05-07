import React from 'react'
import { Container } from '@material-ui/core'

import GradesSection from './gradesSection'
import ClimbStyleSection from './climbStyleSection'


const ChartsContainer = () => {
  return (
    <Container maxWidth="md">
      <GradesSection />
      <ClimbStyleSection />
    </Container>
  )
}

export default ChartsContainer