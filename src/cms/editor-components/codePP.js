import CMS from "netlify-cms"
import React from "react"

import CodePagePart from "../../components/code-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "codePP",
  // Visible label
  label: "Code pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "caption", label: "Caption", widget: "string", required: false },
    { name: "language", label: "Language", widget: "string", required: false },
    { name: "code", label: "Code", widget: "text" },
    { name: "text", label: "Text", widget: "text", required: false },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<code-pagepart title="(.+)?" language="(.+)?" caption="(.+)?" code="([\S\s]+)" text="([\S\s]+)?"><\/code-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      title: match[1],
      language: match[2],
      caption: match[2],
      code: match[3],
      text: match[4],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<code-pagepart title="${obj.title}" language="${
      obj.language
    }" caption="${obj.caption}" code="${
      obj.code
        ? obj.code.replace(/\n/gi, "{{newline}}").replace(/\n/gi, "")
        : ""
    }" text="${obj.text}"></code-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    const code = obj.code ? obj.code.replace(/({{newline}})/gi, "\r\n") : ""

    return (
      <CodePagePart
        title={obj.title}
        caption={obj.caption}
        code={code}
        text={obj.text}
      />
    )
  },
})
