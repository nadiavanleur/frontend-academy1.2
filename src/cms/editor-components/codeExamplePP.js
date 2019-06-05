import CMS from "netlify-cms"
import React from "react"

import CodeExamplePagePart from "../../components/code-example-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "codeExamplePP",
  // Visible label
  label: "Code example pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "userid", label: "User ID", widget: "string", required: false },
    { name: "embedcode", label: "Embed code", widget: "string" },
    {
      name: "output",
      label: "Output",
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
  pattern: /^<code-example-pagepart embedcode="(\S+)" userid="(\S+)?" title="(.+)?" output="(.+)" caption="(.+)?"><\/code-example-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      embedcode: match[1],
      userid: match[2],
      title: match[3],
      output: match[4],
      caption: match[5],
      text: match[6],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<code-example-pagepart embedcode="${obj.embedcode}" userid="${
      obj.userid
    }" title="${obj.title}" output="${obj.output}" caption="${
      obj.caption
    }"></code-example-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      <CodeExamplePagePart
        embedcode={obj.embedcode}
        userid={obj.userid}
        title={obj.title}
        output={obj.output}
        caption={obj.caption}
      />
    )
  },
})
