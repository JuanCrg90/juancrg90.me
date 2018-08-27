import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import compose from 'compose-function';
import withAnalytics from 'next-ga';

class PersonalSite extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default compose(
  withAnalytics('UA-56736524-1', Router),
)(PersonalSite);
