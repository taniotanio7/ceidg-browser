import Head from 'next/head'
import '~/styles/index.css';
import Header from "~/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
