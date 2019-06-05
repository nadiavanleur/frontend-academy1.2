import React from "react"
import PropTypes from "prop-types"
import PostPage from "../../templates/post"

const PostPagePreview = ({ entry }) => {
  const data = {
    htmlAst: entry.getIn(["data", "body"]),
    post: {
      frontmatter: {
        title: entry.getIn(["data", "title"]),
        description: entry.getIn(["data", "description"]),
        toKnow: entry.getIn(["data", "toKnow"]),
        toLearn: entry.getIn(["data", "toLearn"]),
        conclusion: entry.getIn(["data", "conclusion"]),
      },
    },
    defaultContent: {
      frontmatter: {
        toKnowLabel: "Dit moet je weten",
        toLearnLabel: "Dit ga je leren",
        conclusionLabel: "Conclusie",
      },
    },
  }

  return <PostPage data={data} />
}

PostPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default PostPagePreview
