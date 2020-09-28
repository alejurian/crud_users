import Head from 'next/head'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../lang/en.json'
import es from '../lang/es.json'
import Layout from '../components/Layout'
import '../styles/globals.css'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: process.browser && localStorage.getItem('lng'),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CRUD Users</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
