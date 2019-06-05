import React, { Component } from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"

import extractComponent from "../functions/extractComponent"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import Progress from "../components/progress"

import ImagePagePart from "../components/image-pagepart"
import VideoPagePart from "../components/video-pagepart"
import VideoFilePagePart from "../components/video-file-pagepart"
import VideoEmbedPagePart from "../components/video-embed-pagepart"
import CodepenPagePart from "../components/codepen-pagepart"
import CodeExamplePagePart from "../components/code-example-pagepart"
import CodePagePart from "../components/code-pagepart"
import NotePagePart from "../components/note-pagepart"
import TextPagePart from "../components/text-pagepart"

class Tutorial extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      progress: 0,
      id: props.data.post.id,
      tutorialNumber: props.pageContext.tutorialNumber,
      postsPerPage: props.pageContext.postsPerPage,
    }
  }

  componentDidMount() {
    this.setState({
      progress: this.getCookie(`tutorial_progress-${this.state.id}`),
    })

    this.setCookie(`last-visited-tutorial`, this.state.id)

    const tutorialPage = Math.ceil(
      this.state.tutorialNumber / this.state.postsPerPage
    )
    this.setCookie(`tutorial-page`, tutorialPage)

    this.scrollDown(this.getCookie(`tutorial_progress-${this.state.id}`))

    this.addProgressTracker()
  }

  componentWillUnmount() {
    this.setCookie(`tutorial_progress-${this.state.id}`, this.state.progress)

    this.removeProgressTracker()
  }

  addProgressTracker() {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.setProgress)
    }
  }

  removeProgressTracker() {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.setProgress)
    }
  }

  setProgress = () => {
    const value = this.getCurrentProgress()

    if (value > this.state.progress) {
      this.setState({ progress: value })
    }
  }

  getCurrentProgress() {
    const windowHeight = window.innerHeight
    const documentHeight = document.body.offsetHeight
    const maxHeight = documentHeight - windowHeight
    const scrollPostition =
      window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop
    const percentage = Math.round((100 * scrollPostition) / maxHeight)

    return percentage
  }

  setCookie(key, value) {
    if (this.getCookie(`cookies-accepted`)) {
      const { cookies } = this.props

      const expires = new Date()
      expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 365 * 20) // Expire 20 years from now

      cookies.set(key, value, { path: "/", expires: expires })
    }
  }

  getCookie(key) {
    const { cookies } = this.props

    return cookies.get(`cookies-accepted`) === "true"
      ? cookies.get(key) || 0
      : 0
  }

  scrollDown(percentage) {
    setTimeout(function() {
      const windowHeight = window.innerHeight
      const documentHeight = document.body.offsetHeight
      const maxHeight = documentHeight - windowHeight

      const scrollPosition = (percentage * maxHeight) / 100

      window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: "smooth",
      })
    }, 50)
  }

  render() {
    const { data } = this.props

    const { siteUrl } = data.site.siteMetadata

    const { slug } = data.post.fields

    const {
      title,
      description,
      toKnow,
      toLearn,
      conclusion,
      prevTutorial,
      nextTutorial,
    } = data.post.frontmatter

    const {
      toKnowLabel,
      toLearnLabel,
      conclusionLabel,
    } = data.defaultContent.frontmatter

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

    const showdown = require("showdown")
    const converter = new showdown.Converter()

    return (
      <Layout page="post">
        <Helmet>
          <link rel="canonical" href={`${siteUrl}${slug}`} />
        </Helmet>
        <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />

        <section className="tutorial__intro wrapper-inner">
          <h2 className="page__title tutorial__title">{title}.</h2>
          <Progress
            elementClass="tutorial__progress"
            progress={this.state.progress}
          />
          <p className="tutorial__description">{description}</p>
          {((toLearn && toLearn.length > 0) ||
            (toKnow && toKnow.length > 0)) && (
            <div className="tutorial__list-wrapper">
              <div className="tutorial__list-wrapper-content">
                {toLearn && toLearn.length > 0 && (
                  <div className="tutorial__intro-list-container tutorial__intro-list-container--learn">
                    <div className="tutorial__intro--learn-inner">
                      <span />
                      <span />
                      <span />
                    </div>
                    <h3 className="tutorial__intro-list-title">
                      {toLearnLabel}
                    </h3>
                    <ul className="tutorial__intro-list">
                      {toLearn.map((item, index) => (
                        <li className="tutorial__intro-list-item" key={index}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {toKnow && toKnow.length > 0 && (
                  <div className="tutorial__intro-list-container tutorial__intro-list-container--know">
                    <h3 className="tutorial__intro-list-title">
                      {toKnowLabel}
                    </h3>
                    <ul className="tutorial__intro-list">
                      {toKnow.map((item, index) => (
                        <li className="tutorial__intro-list-item" key={index}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <div className="wrapper-inner pageparts-container">
          {renderAst(data.post.htmlAst)}

          {conclusion !== "undefined" && conclusion !== "" && conclusion && (
            <div className="tutorial__conclusion pagepart">
              <h3 className="pagepart__title">{conclusionLabel}</h3>
              <p
                className="pagepart__text"
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(conclusion),
                }}
              />
            </div>
          )}

          {(nextTutorial || prevTutorial) && (
            <Pagination
              nextPage={nextTutorial ? nextTutorial : null}
              prevPage={prevTutorial ? prevTutorial : null}
            />
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query tutorialQuery($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      id
      fields {
        slug
      }
      frontmatter {
        title
        date
        description
        toKnow
        toLearn
        conclusion
        nextTutorial
        prevTutorial
      }
    }
    defaultContent: markdownRemark(
      frontmatter: { templateKey: { eq: "defaultPost" } }
    ) {
      frontmatter {
        toKnowLabel
        toLearnLabel
        conclusionLabel
      }
    }
  }
`

Tutorial.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        toKnow: PropTypes.array,
        toLearn: PropTypes.array,
        conclusion: PropTypes.string,
        prevTutorial: PropTypes.string,
        nextTutorial: PropTypes.string,
        progress: PropTypes.number,
      }).isRequired,
    }).isRequired,
    defaultContent: PropTypes.shape({
      frontmatter: PropTypes.shape({
        toKnowLabel: PropTypes.string,
        toLearnLabel: PropTypes.string,
        conclusionLabel: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default withCookies(Tutorial)
