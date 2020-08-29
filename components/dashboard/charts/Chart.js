import React from 'react'
import { Container, Card, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NetworkError from '~/components/network-error'

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    height: '350px',
    padding: '1rem',
    margin: '1rem'
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
    ...theme.noDataBox,
    height: '350px'
  }
}))

const NoDataLabel = () => {
  const { label } = useStyles()
  return (
    <Typography className={label} color='textSecondary'>
      No climbs entered yet!
    </Typography>
  )
}

const Chart = ({ loading, error, children, title, noData }) => {
  const { chart, chartTitle, loadingContainer } = useStyles()

  if (loading || error) {
    return (
      <Container maxWidth='sm'>
        <Card className={loadingContainer} >
          {error ? <NetworkError /> : <CircularProgress />}
        </Card>
      </Container>
    )
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