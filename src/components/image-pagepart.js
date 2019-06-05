import React, { Component } from "react"
// import Img from "gatsby-image"
import PropTypes from "prop-types"

class ImagePagePart extends Component {
  render() {
    const { title, image, alt, caption } = this.props

    return (
      <div className={`image-pp pagepart`}>
        {title !== "undefined" && title !== "" && title && (
          <h3 className={`image-pp__title pagepart__title`}>{title}</h3>
        )}

        <div className={`image-pp__container pagepart__container`}>
          <div className="image-pp__main-element">
            {image !== "undefined" && image !== "" && image && (
              <img
                src={image}
                alt={alt ? alt : "image"}
                className="image-pp__image"
              />
            )}

            {caption !== "undefined" && caption !== "" && caption && (
              <caption className={`image-pp__caption pagepart__caption`}>
                {caption}
              </caption>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ImagePagePart.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  caption: PropTypes.string,
}

ImagePagePart.defaultProps = {}

export default ImagePagePart
