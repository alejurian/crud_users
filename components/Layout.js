import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import styles from '../styles/Layout.module.css'

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <Fragment>
        <Navbar></Navbar>
        <main className={styles.main}>{children}</main>
      </Fragment>
    )
  }
}

export default Layout
