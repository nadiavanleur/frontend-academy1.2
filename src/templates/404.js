import React, { Component } from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import extractComponent from "../functions/extractComponent"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ImagePagePart from "../components/image-pagepart"
import VideoPagePart from "../components/video-pagepart"
import VideoFilePagePart from "../components/video-file-pagepart"
import VideoEmbedPagePart from "../components/video-embed-pagepart"
import CodepenPagePart from "../components/codepen-pagepart"
import CodeExamplePagePart from "../components/code-example-pagepart"
import CodePagePart from "../components/code-pagepart"
import NotePagePart from "../components/note-pagepart"
import TextPagePart from "../components/text-pagepart"

class PageNotFound extends Component {
  render() {
    const { data } = this.props

    const body = data.markdownRemark.htmlAst

    const { title } = data.markdownRemark.frontmatter

    const { siteUrl } = data.site.siteMetadata

    const renderAst = new rehypeReact({
      createElement: (component, props, children) =>
        extractComponent(component, props, children),
      components: {
        "image-pagepart": ImagePagePart,
        "video-pagepart": VideoPagePart,
        "video-file-pagepart": VideoFilePagePart,
        "video-embed-pagepart": VideoEmbedPagePart,
        "codepen-pagepart": CodepenPagePart,
        "code-example-pagepart": CodeExamplePagePart,
        "code-pagepart": CodePagePart,
        "note-pagepart": NotePagePart,
        "text-pagepart": TextPagePart,
      },
    }).Compiler

    const pageHeader = <h2 className="page__title">{title}.</h2>

    return (
      <Layout pageHeader={pageHeader} page="404">
        <Helmet>
          <link rel="canonical" href={`${siteUrl}/404`} />
        </Helmet>
        <SEO title={title} />
        <section className="wrapper-inner pageNotFound">
          <p className="pageNotFound__text">{renderAst(body)}</p>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query pageNotFound {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "404" } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`

PageNotFound.propTypes = {
  title: PropTypes.string,
}

PageNotFound.defaultProps = {}

export default PageNotFound
