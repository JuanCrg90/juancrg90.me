import Head from 'next/head';
import { Component } from 'react';

class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <main>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet" />
          <title>
            Juan Carlos Ruiz - Software Engineer
          </title>
        </Head>
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
