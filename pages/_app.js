//this is where we load all global CSS 
//bring in bootstrap with css media queries
//bring in Head component
import Head from 'next/head';
import '../styles/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
  <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Component {...pageProps} />

  </>
  );
}

export default MyApp
