import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import React, { Component } from "react"

import Navigation from "../components/navigation.js"

class Header extends Component {
  render() {
    const { data, pageHeader, page } = this.props
    const { title } = data.site.siteMetadata
    const { logo } = data

    return (
      <header className={`header header--${page}`}>
        <div className="wrapper-inner header__inner">
          <h1 className="header__title">
            <Link
              to="/"
              activeClassName="active"
              className="header__title-link"
            >
              {logo && logo.childImageSharp !== null && (
                <Img
                  fluid={logo.childImageSharp.fluid}
                  alt={title ? title : "logo"}
                  className="header__logo"
                  sizes={logo.sizes}
                />
              )}
              {logo &&
                logo.childImageSharp === null &&
                logo.publicURL !== null && (
                  <img
                    src={logo.publicURL}
                    alt={title ? title : "logo"}
                    className="header__logo"
                  />
                )}
            </Link>
          </h1>

          <Navigation itemClassName="header" />
        </div>
        <div className="header__bottom wrapper-inner">{pageHeader}</div>
      </header>
    )
  }
}

export default props => (
  <StaticQuery
    query={headerQuery}
    render={data => <Header data={data} {...props} />}
  />
)

export const headerQuery = graphql`
  query headerQuery {
    site {
      siteMetadata {
        title
      }
    }
    logo: file(relativePath: { eq: "logo.svg" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
