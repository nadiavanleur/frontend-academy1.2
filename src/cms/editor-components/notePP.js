import CMS from "netlify-cms"
import React from "react"

import NotePagePart from "../../components/note-pagepart"

CMS.registerEditorComponent({
  // Internal id of the component
  id: "notePP",
  // Visible label
  label: "Note pagepart",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "title", label: "Title", widget: "string", required: false },
    { name: "text", label: "Text", widget: "text" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<note-pagepart title="(.+)?" text="([\S\s]+)"><\/node-pagepart>$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      title: match[1],
      text: match[2],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return `<note-pagepart title="${obj.title}" text="${
      obj.text
    }"></note-pagepart>`
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return <NotePagePart title={obj.title} text={obj.text} />
  },
})
