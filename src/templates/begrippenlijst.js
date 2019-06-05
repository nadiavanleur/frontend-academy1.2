import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Glossary extends Component {
  groupArray(array) {
    let prevFirstLetter = ""
    let groupedArray = []

    array.map(({ definition }) => {
      const firstLetter = definition.term.charAt(0)

      if (firstLetter !== prevFirstLetter) {
        groupedArray.push({
          firstLetter: firstLetter,
          definitions: [definition],
        })
        prevFirstLetter = firstLetter
      } else {
        groupedArray[groupedArray.length - 1].definitions.push(definition)
      }
      return 0
    })

    return groupedArray
  }

  render() {
    const { data } = this.props

    const { title, definitions } = data.markdownRemark.frontmatter

    const { siteUrl } = data.site.siteMetadata

    const sortedDefinitions = definitions.sort(function(a, b) {
      if (a.definition.term < b.definition.term) {
        return -1
      }
      if (a.definition.term > b.definition.term) {
        return 1
      }
      return 0
    })

    const groupedDefinitions = this.groupArray(sortedDefinitions)

    const pageHeader = <h2 className="page__title">{title}.</h2>

    return (
      <Layout pageHeader={pageHeader} page="glossary">
        <Helmet>
          <link rel="canonical" href={`${siteUrl}/begrippenlijst`} />
        </Helmet>
        <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
        <section className="wrapper-inner glossary">
          {groupedDefinitions.map(({ firstLetter, definitions }) => {
            return (
              <div className="glossary__group" key={firstLetter}>
                <h3
                  className="glossary__group-title"
                  id={`letter-${firstLetter}`}
                >
                  <a
                    href={`/begrippenlijst#letter-${firstLetter}`}
                    className="glossary__group-link"
                  >
                    {firstLetter}.
                  </a>
                </h3>
                <ul className="glossary__list">
                  {definitions.map(({ term, description }) => {
                    return (
                      <li
                        className="glossary__item"
                        id={term.toLowerCase()}
                        key={term}
                      >
                        <h3 className="glossary__title">
                          <a
                            href={`/begrippenlijst#${term.toLowerCase()}`}
                            className="glossary__link"
                          >
                            {term}
                          </a>
                        </h3>
                        <p className="glossary__description">{description}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </section>
      </Layout>
    )
  }
}

Glossary.propTypes = {
  title: PropTypes.string,
  definitions: PropTypes.array,
}

Glossary.defaultProps = {}

export default Glossary

export const query = graphql`
  query glossary {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "begrippenlijst" } }) {
      frontmatter {
        title
        definitions {
          definition {
            term
            description
          }
        }
      }
    }
  }
`
