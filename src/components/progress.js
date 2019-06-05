import React, { Component } from "react"
import PropTypes from "prop-types"

class Progress extends Component {
  render() {
    const { progress, elementClass } = this.props

    return (
      <progress
        className={`${elementClass} progress`}
        value={progress !== undefined && progress !== null ? progress : 0}
        max="100"
      />
    )
  }
}

Progress.propTypes = {
  elementClass: PropTypes.string,
}

export default Progress
