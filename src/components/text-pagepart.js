import React, { Component } from "react"
import PropTypes from "prop-types"

class TextPagePart extends Component {
  render() {
    const { title, text } = this.props
    const showdown = require("showdown")
    const converter = new showdown.Converter()

    return (
      <div className={`text-pp pagepart`}>
        {title !== "undefined" && title !== "" && (
          <h3 className={`text-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`text-pp__container pagepart__container`}>
          {text !== "undefined" && text !== "" && (
            <p
              className={`text-pp__text pagepart__text`}
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(
                  text.replace(/({{newline}})/gi, "\n")
                ),
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

TextPagePart.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
}

TextPagePart.defaultProps = {}

export default TextPagePart
