/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react"

import Header from "./header"
import Footer from "./footer"
import CookieNotification from "./cookie-notification"

import { CookiesProvider } from "react-cookie"

import "../styles/style.scss"

class Layout extends Component {
  render() {
    const { children, pageHeader, page } = this.props

    return (
      <CookiesProvider>
        <div className={`page page--${page}`}>
          <Header pageHeader={pageHeader} />

          <main className="page__main">{children}</main>

          <Footer />

          <CookieNotification />
        </div>
      </CookiesProvider>
    )
  }
}

export default Layout
