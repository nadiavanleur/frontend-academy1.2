import CMS from "netlify-cms"
import React from "react"

import CodepenPagePart from "../../components/codepen-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "codepenPP",
  // Visible label
  label: "Codepen pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "userid", label: "User ID", widget: "string", required: false },
    { name: "embedcode", label: "Embed code", widget: "string" },
    {
      name: "output",
      label: "Default output",
      widget: "inline-select",
      multiple: true,
      options: [
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "js", label: "Javascript" },
        { value: "result", label: "Result" },
      ],
    },
    { name: "caption", label: "Caption", widget: "string", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<codepen-pagepart userid="(\S+)" embedcode="(\S+)" title="(.+)?" output="(.+)" caption="(.+)?"><\/codepen-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      userid: match[1],
      embedcode: match[2],
      title: match[3],
      output: match[4],
      caption: match[5],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<codepen-pagepart userid="${obj.userid}" embedcode="${
      obj.embedcode
    }" title="${obj.title}" output="${obj.output}" caption="${
      obj.caption
    }"></codepen-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <CodepenPagePart
        userid={obj.userid}
        embedcode={obj.embedcode}
        title={obj.title}
        output={obj.output}
        caption={obj.caption}
      />
    )
  },
})
