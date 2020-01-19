import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-hooks'

import createClient from '../src/app/createClient'
import getPageContext from '../src/getPageContext';
import Page from '../src/app/page'

class iClimbApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Head>
          <title>iClimb</title>
        </Head>
        <ThemeProvider theme={this.pageContext.theme}>
          <CssBaseline />
          <Page>
            <Component pageContext={this.pageContext} {...pageProps} />
          </Page>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default createClient(iClimbApp);
