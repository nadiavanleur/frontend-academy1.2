import React, { Component } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Index extends Component {
  render() {
    const { data } = this.props

    const { image } = data.markdownRemark.frontmatter

    const { siteUrl } = data.site.siteMetadata

    return (
      <Layout page="index">
        <Helmet>
          <link rel="canonical" href={`${siteUrl}`} />
        </Helmet>
        <SEO title=".academy" keywords={[`gatsby`, `application`, `react`]} />
        <section className="hero">
          <div className="wrapper-inner hero__container">
            {image && image.childImageSharp !== null && (
              <Img
                fluid={image.childImageSharp.fluid}
                objectFit="contain"
                className="hero__image Img"
                alt="hero"
              />
            )}
            {image &&
              image.childImageSharp === null &&
              image.publicURL &&
              image.publicURL !== null && (
                <img
                  src={image.publicURL}
                  alt="hero"
                  className="hero__image publicURL"
                />
              )}
            {image &&
              image.childImageSharp === null &&
              image.publicURL === null && (
                <img src={image} alt="hero" className="hero__image" />
              )}
            <div className="hero__buttons">
              <Link to="/tutorials/html" className="hero__button btn">
                HTML
              </Link>
              <Link to="/tutorials/css" className="hero__button btn">
                CSS
              </Link>
              <Link to="/tutorials/javascript" className="hero__button btn">
                Javascript
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <Index data={data} {...props} />}
  />
)

Index.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export const indexQuery = graphql`
  query indexQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
