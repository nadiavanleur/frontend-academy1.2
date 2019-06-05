import React, { Component } from "react"
import PropTypes from "prop-types"

class CodeExamplePagePart extends Component {
  render() {
    const { title, userid, embedcode, output, caption } = this.props

    return (
      <div className={`codepen-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`codepen-pp__title pagepart__title`}>
            <u className="pagepart__title-underline">{title}</u>
          </h3>
        )}

        <div className={`codepen-pp__container pagepart__container`}>
          {embedcode !== "undefined" && embedcode !== "" && embedcode && (
            <iframe
              src={`//jsfiddle.net/${userid}/${embedcode}/embedded/${output}/`}
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

CodeExamplePagePart.propTypes = {
  title: PropTypes.string,
  userid: PropTypes.string,
  embedcode: PropTypes.string,
  output: PropTypes.string,
  caption: PropTypes.string,
}

CodeExamplePagePart.defaultProps = {
  userid: "nonexistent",
}

export default CodeExamplePagePart
