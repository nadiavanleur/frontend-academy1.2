import CMS from "netlify-cms"
import React from "react"

import TextPagePart from "../../components/text-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "textPP",
  // Visible label
  label: "Text pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    {
      name: "text",
      label: "Text",
      widget: "markdown",
      buttons: [
        "bold",
        "italic",
        "code",
        "link",
        "heading-two",
        "bulleted-list",
        "numbered-list",
      ],
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<text-pagepart title="(.+)?" text="([\S\s]+)"><\/text-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      title: match[1],
      text: match[2],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<text-pagepart title="${obj.title}" text="${
      obj.text
        ? obj.text.replace(/\n/gi, "{{newline}}").replace(/\n/gi, "")
        : ""
    }"></text-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    const text = obj.text ? obj.text.replace(/({{newline}})/gi, "\r\n") : ""

    return <TextPagePart title={obj.title} text={text} />
  },
})
