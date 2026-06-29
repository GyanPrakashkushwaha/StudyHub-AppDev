
import React from 'react'
import Header from './views/Header'
import Footer from './views/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
