import React, { Component } from "react"
import PropTypes from "prop-types"

class CodepenPagePart extends Component {
  render() {
    const { title, userid, embedcode, output, caption } = this.props

    return (
      <div className={`codepen-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`codepen-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`codepen-pp__container pagepart__container`}>
          {embedcode !== "undefined" && embedcode !== "" && embedcode && (
            <iframe
              src={`//codepen.io/${userid}/embed/${embedcode}/?height=265&theme-id=0&default-tab=${output}`}
              title={title ? title : embedcode}
              className="codepen-pp__iframe"
            />
          )}

          {caption !== "undefined" && caption !== "" && caption && (
            <caption className={`codepen-pp__caption pagepart__caption`}>
              {caption}
            </caption>
          )}
        </div>
      </div>
    )
  }
}

CodepenPagePart.propTypes = {
  title: PropTypes.string,
  userid: PropTypes.string,
  embedcode: PropTypes.string,
  output: PropTypes.string,
  caption: PropTypes.string,
}

CodepenPagePart.defaultProps = {
  userid: "team/codepen",
}

export default CodepenPagePart
