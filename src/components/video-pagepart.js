import React, { Component } from "react"
import PropTypes from "prop-types"

class VideoPagePart extends Component {
  render() {
    console.log(this.props)
    const { title, caption, children } = this.props

    return (
      <div className={`video-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`video-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`video-pp__container pagepart__container`}>
          <div className="video-pp__main-element">
            {children !== "undefined" && children !== "" && children && (
              <div className="video-pp__video-wrapper">
                <div className="video-pp__iframe-wrapper">{children}</div>
              </div>
            )}

            {caption !== "undefined" && caption !== "" && caption && (
              <caption className={`video-pp__caption pagepart__caption`}>
                {caption}
              </caption>
            )}
          </div>
        </div>
      </div>
    )
  }
}

VideoPagePart.propTypes = {
  title: PropTypes.string,
  embedcode: PropTypes.string,
  platform: PropTypes.string,
  caption: PropTypes.string,
}

VideoPagePart.defaultProps = {
  platform: "youtube",
}

export default VideoPagePart
