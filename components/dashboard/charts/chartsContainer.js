import React from 'react'
import { Container } from '@material-ui/core'

import GradesSection from './gradesSection'
import ClimbStyleSection from './climbStyleSection'


const ChartsContainer = () => {
  return (
    <Container maxWidth='sm'>
      <GradesSection />
      <ClimbStyleSection />
    </Container>
  )
}

export default ChartsContainer