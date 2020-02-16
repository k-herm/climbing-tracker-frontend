/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Head from '../components/head';
import Nav from '../components/nav';

const Index = () => {
  return (
    <div>Hello world</div>
    // <Container maxWidth="sm">
    //   <Box my={4}>
    //     <Typography variant="h4" component="h1" gutterBottom>
    //       Next.js example
    //     </Typography>
    //     <Link href="/about" color="secondary">
    //       Go to the about page
    //     </Link>
    //     {/* <ProTip /> */}
    //     <Copyright />
    //   </Box>
    // </Container>
  );
}

export default Index