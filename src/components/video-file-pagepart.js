import React, { Component } from "react"
import PropTypes from "prop-types"

class VideoFilePagePart extends Component {
  render() {
    const { title, file, caption } = this.props

    return (
      <div className={`video-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`video-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`video-pp__container pagepart__container`}>
          <div className="video-pp__main-element">
            {file !== "undefined" && file !== "" && file && (
              <div className="video-pp__video-wrapper">
                <div className="video-pp__iframe-wrapper">
                  {file && (
                    <video className="video-pp__video">
                      <source src={file} type="video/mp4" />
                      <source src={file} type="video/ogg" />
                      "Your browser does not support HTML5 video."
                    </video>
                  )}
                </div>
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

VideoFilePagePart.propTypes = {
  title: PropTypes.string,
  file: PropTypes.string,
  caption: PropTypes.string,
}

export default VideoFilePagePart
