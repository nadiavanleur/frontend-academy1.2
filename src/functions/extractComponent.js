import React from "react"

const extractComponent = (component, props, children) => {
  if (component === "div") {
    return <React.Fragment {...props}>{children}</React.Fragment>
  }

  return React.createElement(component, props, children)
}

export default extractComponent
