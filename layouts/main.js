import Head from 'next/head';
import { Component } from 'react';
import TwitterCard from '../components/twitter-card';
import OpenGraph from '../components/open-graph';
import Menu from '../components/menu';

class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <main>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet" />
          <title>
            Juan Carlos Ruiz - Software Engineer
          </title>

          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <TwitterCard />
        <OpenGraph />
        <Menu />
        {children}

        <style jsx global>
          {` body {
            font-family: 'Raleway', sans-serif;
            margin: 0;
            font-size: 1rem;
            font-weight: 200;
          }
          ::selection {
            background-color: #000;
            color: #FFF;
          }
        `}
        </style>
      </main>
    );
  }
}

export default MainLayout;
