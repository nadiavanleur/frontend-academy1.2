import CMS from "netlify-cms"
import React from "react"

import VideoPagePart from "../../components/video-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "videoPP",
  // Visible label
  label: "Video pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    {
      name: "embedcode",
      label: "Embed code",
      widget: "string",
      required: false,
    },
    { name: "file", label: "Upload file", widget: "file", required: false },
    {
      name: "platform",
      label: "Platform",
      widget: "select",
      options: ["youtube", "vimeo", "file", "other"],
    },
    { name: "caption", label: "Caption", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<video-pagepart file="(\S+)?" embedcode="(\S+)?" platform="(\S+)" title="(.+)?" caption="(.+)?"><\/video-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      file: match[1],
      embedcode: match[2],
      platform: match[3],
      title: match[4],
      caption: match[5],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<video-pagepart file="${obj.file}" embedcode="${
      obj.embedcode
    }"  platform="${obj.platform}" title="${obj.title}" caption="${
      obj.caption
    }"></video-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <VideoPagePart
        file={obj.file}
        embedcode={obj.embedcode}
        platform={obj.platform}
        title={obj.title}
        caption={obj.caption}
      />
    )
  },
})
