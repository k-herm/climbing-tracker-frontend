/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from '@material-ui/core'

import Header from '~/components/home-page/header'
import Cover from '~/components/home-page/cover'
import Content from '~/components/home-page/content'
import Footer from '~/components/home-page/footer'

const HomePage = () => {
  const climbHeadline = "A quick and simple climbing tracker to log your climbs."
  const dataHeadline = "Like seeing numbers? Collect stats and visualize your progress over time."
  const projectHeadline = "Projecting? Track your attempts and set goals."

  return (
    <>
      <Header />
      <Cover
        image="/climber2.jpg"
        headline="Elevate yourself to the next level"
        mediaQueryPosition="right"
      />

      <Container maxWidth="md">
        <Content
          icon="/climb-icon.png"
          headline={climbHeadline}
        />
        <Content
          icon="/data-icon.png"
          headline={dataHeadline}
          imageRight="/iphone-dashboard.png"
          imageBottom="/analytics-gradesChart.jpg"
        />
      </Container>

      <Cover
        image="/tonsai.jpg"
        headline="Work. Motivate. Send."
        mediaQueryPosition="left"
      />

      <Container maxWidth="md">
        <Content
          icon="/progress-icon.png"
          headline={projectHeadline}
          imageRight="/iphone-projects.png"
          imageBottom="/projects-completeGoals.jpg"
        />
      </Container>

      <Footer />
    </>
  )
}

export default HomePage