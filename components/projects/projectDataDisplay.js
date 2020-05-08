import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import HeadlineCover from '~/components/headlineCover'
import { formatGradeValue } from '~/src/app/utils'
import DetailsCard from './detailsCard'

const useStyles = makeStyles((theme) => ({
}))

const ProjectDataDisplay = ({ data }) => {
  const classes = useStyles()
  console.log(data);

  if (!data) return null
  return (
    <HeadlineCover image="/mountain2.jpg">
      <DetailsCard data={data} />
    </HeadlineCover>
  )
}

ProjectDataDisplay.propTypes = {
  data: PropTypes.object
}
export default ProjectDataDisplay