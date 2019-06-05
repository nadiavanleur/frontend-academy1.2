import React, { Component } from "react"
import PropTypes from "prop-types"

import VideoPagePart from "../components/video-pagepart"

class VideoEmbedPagePart extends Component {
  render() {
    const { title, embedcode, platform } = this.props
    const platforms = {
      youtube: `https://www.youtube.com/embed/${embedcode}`,
      vimeo: `https://player.vimeo.com/video/${embedcode}`,
      other: `${embedcode}`,
      file: `ignore`,
    }

    return (
      <VideoPagePart {...this.props}>
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
      </VideoPagePart>
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
