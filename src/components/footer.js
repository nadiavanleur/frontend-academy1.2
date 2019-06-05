import React, { Component } from "react"

import Navigation from "../components/navigation.js"

class Footer extends Component {
  render() {
    return (
      <footer className="footer page__footer">
        <div className="wrapper-inner footer__container">
          <Navigation itemClassName="footer" />
          <p className="footer__credits">
            © {new Date().getFullYear()}, Mogelijk gemaakt door
            {` `}
            <a href="https://www.e-sites.nl" className="footer__credits-link">
              <img
                className="footer__credits-logo"
                src="/img/esites-logo-color.svg"
                alt="E-sites"
              />
            </a>
          </p>
        </div>
      </footer>
    )
  }
}

export default Footer
