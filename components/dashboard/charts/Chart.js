import React from 'react'
import { Container, Card, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NetworkError from '~/components/networkError'

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    height: '300px',
    padding: '2rem'
  },
  chart: {
    margin: '1rem 0'
  },
  chartTitle: {
    textAlign: 'center',
    marginTop: '2rem',
    marginBottom: '1rem'
  },
  label: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    border: '1.5px solid lightgrey',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '2rem'
  }
}))

const NoDataLabel = () => {
  const { label } = useStyles()
  return (
    <Typography className={label} color='textSecondary'>
      No climbs logged
    </Typography>
  )
}

const Chart = ({ loading, error, children, title, noData }) => {
  const { chart, chartTitle, loadingContainer } = useStyles()

  if (loading) {
    return (
      <Container maxWidth='sm'>
        <Card className={loadingContainer} >
          <CircularProgress />
        </Card>
      </Container>
    )
  }

  if (error) {
    return <NetworkError />
  }

  return (
    <Card className={chart}>
      <Typography variant='h5' className={chartTitle} color='primary'>
        {title}
      </Typography>
      {noData ? <NoDataLabel /> : children}
    </Card>
  )
}

export default Chart