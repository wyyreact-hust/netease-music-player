import React from 'react'

import Header from './Header/Header'
import Footer from './Footer/Footer'

import styles from './layout.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.middle}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
