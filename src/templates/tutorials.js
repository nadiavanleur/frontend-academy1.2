import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostItem from "../components/postItem"
import Pagination from "../components/pagination"

class Tutorials extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.renderPosts()
  }

  componentWillUnmount() {}

  renderPosts() {
    const { edges: posts } = this.props.data.allMarkdownRemark

    posts.map(({ node }) => {
      const id = node.id
      const progress = this.getCookie(`tutorial_progress-${id}`)

      this.setProgress(id, progress)
      return true
    })
  }

  getCookie(key) {
    const { cookies } = this.props

    return cookies.get(`cookies-accepted`) === "true"
      ? cookies.get(key) || 0
      : 0
  }

  setProgress(id, progress) {
    this.setState({ [id]: progress })
  }

  ifLastVisited(id) {
    const lastVisited = this.getCookie(`last-visited-tutorial`)

    return lastVisited === id
  }

  render() {
    const { data, pageContext } = this.props

    const { title } = data.markdownRemark.frontmatter

    const { edges: posts } = data.allMarkdownRemark

    const { currentPage, totalPages, slug, titleTag } = pageContext

    const { siteUrl } = data.site.siteMetadata

    const pageHeader = (
      <h2 className="page__title">
        {`${title} ${titleTag ? `- ${titleTag}` : ""}`}.
      </h2>
    )

    return (
      <Layout pageHeader={pageHeader} page="overview">
        <Helmet>
          <link rel="canonical" href={`${siteUrl}/tutorials`} />
        </Helmet>
        <SEO
          title={`${title} ${titleTag ? `- ${titleTag}` : ""}`}
          keywords={[`gatsby`, `application`, `react`]}
        />

        <div className="wrapper-inner overview">
          <section className="posts-container">
            {posts.map(({ node: post }) => (
              <PostItem
                post={post.frontmatter}
                slug={post.fields.slug}
                progress={this.state[post.id]}
                elementClass={this.ifLastVisited(post.id) ? "in-progress" : ""}
                key={post.id}
              />
            ))}
          </section>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageNumbers={true}
              slug={slug}
            />
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query tutorialsQuery($skip: Int!, $limit: Int!, $titleTag: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "tutorial" }
          defaultContent: { ne: true }
          languages: { in: [$titleTag] }
        }
      }
      limit: $limit
      skip: $skip
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            description
            languages
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
    }
    markdownRemark(frontmatter: { templateKey: { eq: "tutorials" } }) {
      frontmatter {
        title
      }
    }
  }
`

Tutorials.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default withCookies(Tutorials)
