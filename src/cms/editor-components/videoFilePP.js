import CMS from "netlify-cms"
import React from "react"

import VideoFilePagePart from "../../components/video-file-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "videoFilePP",
  // Visible label
  label: "Video file pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "file", label: "Upload file", widget: "file", required: false },
    { name: "caption", label: "Caption", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<video-file-pagepart file="(\S+)?" title="(.+)?" caption="(.+)?"><\/video-file-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      file: match[1],
      title: match[2],
      caption: match[3],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<video-file-pagepart file="${obj.file}" title="${
      obj.title
    }" caption="${obj.caption}"></video-file-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <VideoFilePagePart
        file={obj.file}
        title={obj.title}
        caption={obj.caption}
      />
    )
  },
})
