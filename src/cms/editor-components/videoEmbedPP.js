import CMS from "netlify-cms"
import React from "react"

import VideoEmbedPagePart from "../../components/video-embed-pagepart"

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
    {
      name: "platform",
      label: "Platform",
      widget: "select",
      options: ["youtube", "vimeo", "file", "other"],
    },
    { name: "caption", label: "Caption", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<video-embed-pagepart embedcode="(\S+)?" platform="(\S+)" title="(.+)?" caption="(.+)?"><\/video-embed-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      embedcode: match[1],
      platform: match[2],
      title: match[3],
      caption: match[4],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<video-embed-pagepart embedcode="${obj.embedcode}"  platform="${
      obj.platform
    }" title="${obj.title}" caption="${obj.caption}"></video-embed-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <VideoEmbedPagePart
        embedcode={obj.embedcode}
        platform={obj.platform}
        title={obj.title}
        caption={obj.caption}
      />
    )
  },
})
