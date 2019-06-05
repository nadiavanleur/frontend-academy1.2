import React, { Component } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"

import Progress from "./progress"

class PostItem extends Component {
  render() {
    const { post, slug, progress, elementClass, key } = this.props
    const { title, image, description } = post

    return (
      <article className="post-item__container" key={key}>
        <div className={`post-item ${elementClass}`}>
          {image && image.childImageSharp !== null && (
            <Img
              className="post-item__image"
              fluid={image.childImageSharp.fluid}
              objectFit="contain"
              alt=""
            />
          )}
          {image &&
            image.childImageSharp === null &&
            image.publicURL !== null && (
              <img src={image.publicURL} className="post-item__image" alt="" />
            )}

          <div className="post-item__content">
            <h3 className="post-item__title">
              <Link
                to={slug}
                activeClassName="active"
                className="post-item__link"
              >
                {title}
              </Link>
            </h3>

            <p className="post-item__description">{description}</p>
          </div>
        </div>
        <Progress elementClass="post-item__progress" progress={progress} />
      </article>
    )
  }
}

PostItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  id: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
}

PostItem.defaultProps = {}

export default PostItem
