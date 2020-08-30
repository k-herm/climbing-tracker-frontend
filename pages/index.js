/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from '@material-ui/core'

import Header from '~/components/home-page/header'
import Cover from '~/components/home-page/cover'
import Content from '~/components/home-page/content'

const HomePage = () => {
  const climbHeadline = "A quick and simple climbing tracker to log your climbs."
  const dataHeadline = "Like seeing numbers? Collect stats and visualize your progress over time."
  const projectHeadline = "Projecting? Track your attempts and set goals."

  return (
    <>
      <Header />
      <Cover />
      <Container maxWidth="md">
        <Content
          icon="/climb-icon.png"
          headline={climbHeadline}
          image={[]}
        />
        <Content
          icon="/data-icon.png"
          headline={dataHeadline}
          image={[]}
        />
        <Content
          icon="/progress-icon.png"
          headline={projectHeadline}
          image={[]}
        />
      </Container>
    </>
  )
}

export default HomePage