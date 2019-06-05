import React, { Component } from "react"
import PropTypes from "prop-types"

import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

class CodePagePart extends Component {
  render() {
    const { title, code, caption, text, language } = this.props

    return (
      <div className={`code-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`code-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`code-pp__container pagepart__container`}>
          <div className="code-pp__main-element pagepart__main-element">
            {code !== "undefined" && code !== "" && code && (
              <div className="code-pp__code">
                <SyntaxHighlighter
                  language={language}
                  style={docco}
                  showLineNumbers={true}
                >
                  {code.replace(/({{newline}})/gi, "\n")}
                </SyntaxHighlighter>
              </div>
            )}
            {caption !== "undefined" && caption !== "" && caption && (
              <caption className={`code-pp__caption pagepart__caption`}>
                {caption}
              </caption>
            )}
          </div>
          {text !== "undefined" && text !== "" && text && (
            <p className={`code-pp__text pagepart__text`}>{text}</p>
          )}
        </div>
      </div>
    )
  }
}

CodePagePart.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  caption: PropTypes.string,
  text: PropTypes.string,
}

CodePagePart.defaultProps = {}

export default CodePagePart
