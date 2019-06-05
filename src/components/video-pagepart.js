import React, { Component } from "react"
import PropTypes from "prop-types"

class VideoPagePart extends Component {
  render() {
    const { title, embedcode, file, platform, caption } = this.props

    const platforms = {
      youtube: `https://www.youtube.com/embed/${embedcode}`,
      vimeo: `https://player.vimeo.com/video/${embedcode}`,
      other: `${embedcode}`,
      file: `ignore`,
    }

    function getEmbedURL() {
      for (let entry of Object.entries(platforms)) {
        if (entry[0].toString() === platform) {
          return entry[1]
        }
      }
      return "platformNotAvailable"
    }

    return (
      <div className={`video-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`video-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`video-pp__container pagepart__container`}>
          <div className="video-pp__main-element">
            {((embedcode !== "undefined" && embedcode !== "" && embedcode) ||
              (file !== "undefined" && file !== "" && file)) && (
              <div className="video-pp__video-wrapper">
                {platform === "file" && file && (
                  <video className="video-pp__video">
                    <source src={file} type="video/mp4" />
                    <source src={file} type="video/ogg" />
                    "Your browser does not support HTML5 video."
                  </video>
                )}
                {platform !== "file" && embedcode && (
                  <iframe
                    src={getEmbedURL()}
                    width="560"
                    height="315"
                    frameborder="0"
                    allowfullscreen
                    title={title ? title : "video"}
                    className="video-pp__iframe"
                  >
                    "Your browser does not support HTML5 video."
                  </iframe>
                )}
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
  file: PropTypes.string,
  platform: PropTypes.string,
  caption: PropTypes.string,
}

VideoPagePart.defaultProps = {
  platform: "youtube",
}

export default VideoPagePart
