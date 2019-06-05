import React, { Component } from "react"

// const files = require.context("!svg-sprite!./svgs", false, /.*\.svg$/)
// files.keys().forEach(files)

const spriteLocation = "/svg-sprite.svg"

class Icon extends Component {
  render() {
    const { type, className } = this.props

    return (
      <svg className={`icon ${className}`} viewBox="0 0 16 16">
        <use xlinkHref={`${spriteLocation}#${type}`} />
      </svg>
    )
  }
}

export default Icon
