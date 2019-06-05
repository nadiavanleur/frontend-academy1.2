import CMS from "netlify-cms"

import {
  InlineSelectControl,
  InlineSelectPreview,
} from "netlify-cms-widget-inline-select"

import "./editor-components/imagePP"
import "./editor-components/videoPP"
import "./editor-components/videoEmbedPP"
import "./editor-components/videoFilePP"
import "./editor-components/codepenPP"
import "./editor-components/codeExamplePP"
import "./editor-components/codePP"
import "./editor-components/notePP"
import "./editor-components/textPP"

CMS.registerWidget("inline-select", InlineSelectControl, InlineSelectPreview)

CMS.registerPreviewStyle(`${__dirname}/src/styles/style.scss`)
