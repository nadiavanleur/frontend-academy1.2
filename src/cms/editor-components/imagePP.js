import CMS from "netlify-cms"
import React from "react"

import ImagePagePart from "../../components/image-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "imagePP",
  // Visible label
  label: "Image pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "image", label: "Image", widget: "image" },
    { name: "alt", label: "Alt", widget: "string" },
    { name: "caption", label: "Caption", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<image-pagepart image="(\S+)" alt="(.+)" title="(.+)?" caption="(.+)?"><\/image-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      image: match[1],
      alt: match[2],
      title: match[3],
      caption: match[4],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<image-pagepart image="${obj.image}" alt="${obj.alt}" title="${
      obj.title
    }" caption="${obj.caption}"></image-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <ImagePagePart
        image={obj.image}
        alt={obj.alt}
        title={obj.title}
        caption={obj.caption}
      />
    )
  },
})
