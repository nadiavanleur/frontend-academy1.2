import React, { Component } from "react"
import Link from "gatsby-link"
import { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"

class CookieNotification extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      cookiesAccepted: this.getCookie(`cookies-accepted`),
    }
  }

  onButtonAccept = () => {
    this.setCookie(`cookies-accepted`, "true")

    this.setState({ cookiesAccepted: "true" })
  }

  setCookie(key, value) {
    const { cookies } = this.props

    const expires = new Date()
    expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 365 * 20) // Expire 20 years from now

    cookies.set(key, value, { path: "/", expires: expires })
  }

  getCookie(key) {
    const { cookies } = this.props

    return cookies.get(key) || 0
  }

  render() {
    return (
      <div
        className={`cookie-notification wrapper-inner ${
          this.state.cookiesAccepted === "true" ? "hide" : ""
        }`}
      >
        <h3 className="cookie-notification__title">Cookies!</h3>
        <p className="cookie-notification__text">
          Wij gebruiken cookies om je voortgang bij te houden.{" "}
          <Link to="/cookie-verklaring" className="cookie-notification__link">
            Klik hier voor meer informatie.
          </Link>
        </p>
        <button
          className="cookie-notification__button btn"
          onClick={this.onButtonAccept}
        >
          &#10004;
        </button>
      </div>
    )
  }
}

CookieNotification.propTypes = {}

export default withCookies(CookieNotification)
