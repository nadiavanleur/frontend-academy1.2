import React, { Component } from "react"
import PropTypes from "prop-types"

class VideoEmbedPagePart extends Component {
  render() {
    const { title, embedcode, platform, caption } = this.props
    const platforms = {
      youtube: `https://www.youtube.com/embed/${embedcode}`,
      vimeo: `https://player.vimeo.com/video/${embedcode}`,
      other: `${embedcode}`,
      file: `ignore`,
    }

    return (
      <div className={`video-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`video-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`video-pp__container pagepart__container`}>
          <div className="video-pp__main-element">
            {embedcode !== "undefined" && embedcode !== "" && embedcode && (
              <div className="video-pp__video-wrapper">
                <div className="video-pp__iframe-wrapper">
                  {embedcode && (
                    <iframe
                      src={platforms[platform]}
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

VideoEmbedPagePart.propTypes = {
  title: PropTypes.string,
  embedcode: PropTypes.string,
  platform: PropTypes.string,
  caption: PropTypes.string,
}

VideoEmbedPagePart.defaultProps = {
  platform: "youtube",
}

export default VideoEmbedPagePart
