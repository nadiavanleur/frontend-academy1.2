import React, { Component } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import PropTypes, { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"

class Navigation extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      tutorialPage: "",
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        tutorialPage: this.getCookie(`tutorial-page`),
      })
    }, 50)
  }

  getCookie(key) {
    const { cookies } = this.props

    return cookies.get(`cookies-accepted`) === "true"
      ? cookies.get(key) || ""
      : ""
  }

  render() {
    const { data, itemClassName } = this.props

    const { navItem } = data.markdownRemark.frontmatter

    return (
      <div
        role="navigation"
        className={`${itemClassName}__nav-wrapper nav__wrapper`}
      >
        <ul className={`${itemClassName}__nav nav`}>
          {navItem.map(({ label, link }) => (
            <li className={`${itemClassName}__nav-item nav__item`} key={link}>
              <Link
                to={
                  link.includes("tutorials")
                    ? `/${link}/${this.state.tutorialPage}`
                    : `${link}`
                }
                activeClassName="active"
                partiallyActive={true}
                className={`${itemClassName}__nav-link nav__link`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Navigation.propTypes = {
  navItem: PropTypes.array,
}

Navigation.defaultProps = {}

const propsFunction = props => (
  <StaticQuery
    query={navigationQuery}
    render={data => <Navigation data={data} {...props} />}
  />
)

export default withCookies(propsFunction)

export const navigationQuery = graphql`
  query navigationQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "nav" } }) {
      frontmatter {
        navItem {
          label
          link
        }
      }
    }
  }
`
