import React from 'react'

import Header from './Header/header'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/footer'

import styles from './layout.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.middle}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
