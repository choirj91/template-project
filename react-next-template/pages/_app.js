import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import '../styles/css/globals.css';
import AppLayout from '../components/AppLayout';
import "../styles/css/sample-css.scss";

const MyApp = ({ Component, pageProps, router }) => (
  <HelmetProvider>
    <Helmet
      title='샘플프로젝트'
      htmlAttributes={{ lang: 'ko' }}
      meta={[
        { charSet: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      ]}
      link={[
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap' },
      ]}
    >
    </Helmet>
    <Head>
          <meta charSet="utf-8" />
          <title>샘플프로젝트</title>
          <meta name="description" content="샘플프로젝트"/>
          <meta name="url" content="샘플프로젝트"/>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta property="og:type" content="website" key="type" />
          <meta property="og:title" content="샘플프로젝트" key="title" />
          <meta property="og:description" content="샘플프로젝트" key="description" />
          <meta property="og:image" content="https://Sample.com/static/images/pre_banner.png" key="image" />
          <meta property="og:url" content="https://Sample.com/" key="url" />
          <link rel="canonical" href={"https://Sample.com/"} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
        </Head>
    <AppLayout router={router}>
      <Component {...pageProps} />
    </AppLayout>
  </HelmetProvider>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  // console.log('metric = ', metric);
}

export default wrapper.withRedux(MyApp);
