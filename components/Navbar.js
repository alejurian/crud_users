import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import i18n from 'i18next'
import { withTranslation } from 'react-i18next'
import styles from '../styles/Navbar.module.css'

function Navbar(props) {
  const { t } = props
  const changeLanguage = (lng) => {
    const currLng = getLangLocalStorage()
    if (currLng !== lng) {
      setLangLocalStorage(lng)
      i18n.changeLanguage(lng)
      Router.reload(window.location.pathname)
    }
  }

  const setLangLocalStorage = (lng) => {
    localStorage.setItem('lng', lng)
  }

  const getLangLocalStorage = () => {
    return localStorage.getItem('lng')
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Link className={styles.headerLink} href="/">
          {t('users')}
        </Link>
      </h1>
      <nav className={styles.headerNavbar}>
        <ul>
          <li>
            <a
              className={styles.headerLink}
              onClick={() => changeLanguage('es')}
            >
              {t('spanish')}
            </a>
          </li>
          <li>
            <a
              className={styles.headerLink}
              onClick={() => changeLanguage('en')}
            >
              {t('english')}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default withTranslation()(Navbar)
