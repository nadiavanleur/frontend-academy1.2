const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query baseQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___date] }
            limit: 1000
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  templateKey
                  title
                  date
                  languages
                  description
                  definitions {
                    definition {
                      term
                      description
                    }
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          return reject(result.errors)
        }

        const allPages = result.data.allMarkdownRemark.edges
        let numberOfPosts = {
          all: 0,
          html: 0,
          css: 0,
          javascript: 0,
        }
        const postsPerPage = 6

        // Normal pages and posts
        allPages.forEach(({ node }) => {
          const slug = node.fields.slug
          const templateKeyVar = node.frontmatter.templateKey
          const languages = node.frontmatter.languages
          const template = `src/templates/${String(templateKeyVar)}.js`

          if (
            templateKeyVar === "404" ||
            templateKeyVar === "cookie-verklaring" ||
            templateKeyVar === "over-ons" ||
            templateKeyVar === "begrippenlijst" ||
            templateKeyVar === "index" ||
            templateKeyVar === "tutorials" ||
            templateKeyVar === "tutorial"
          ) {
            if (templateKeyVar === "tutorial") {
              numberOfPosts.all++

              const langString = languages.toString().toLowerCase()

              if (langString.includes("html")) {
                numberOfPosts.html++
              }

              if (langString.includes("css")) {
                numberOfPosts.css++
              }

              if (langString.includes("javascript")) {
                numberOfPosts.javascript++
              }

              createPage({
                path: slug,
                component: path.resolve(template),
                context: {
                  slug,
                  id: node.id,
                  limit: 1,
                  skip: 1,
                  tutorialNumber: numberOfPosts.all,
                  postsPerPage: postsPerPage,
                },
              })
            } else {
              createPage({
                path: slug,
                component: path.resolve(template),
                context: {
                  slug,
                  id: node.id,
                  limit: 1,
                  skip: 1,
                },
              })
            }
          }
        })

        // General tutorial pages
        createOverviewPages(numberOfPosts.all, postsPerPage, "tutorials")

        // HTML tutorial pages
        createOverviewPages(
          numberOfPosts.html,
          postsPerPage,
          "tutorials/html",
          "html"
        )

        // CSS tutorial pages
        createOverviewPages(
          numberOfPosts.css,
          postsPerPage,
          "tutorials/css",
          "css"
        )

        // Javascript tutorial pages
        createOverviewPages(
          numberOfPosts.javascript,
          postsPerPage,
          "tutorials/javascript",
          "javascript"
        )

        function createOverviewPages(
          numberOfPosts,
          postsPerPage,
          slug,
          titleTag
        ) {
          const numPages = Math.ceil(numberOfPosts / postsPerPage)

          const all = titleTag ? "" : "-all"

          Array.from({ length: numPages }).forEach((_, i) => {
            if (i === 0) {
              createPage({
                path: `/${slug}/`,
                component: path.resolve(`./src/templates/tutorials${all}.js`),
                context: {
                  limit: postsPerPage,
                  skip: i * postsPerPage,
                  currentPage: i + 1,
                  totalPages: numPages,
                  slug: slug,
                  titleTag: titleTag,
                },
              })
            }

            createPage({
              path: `/${slug}/${i + 1}`,
              component: path.resolve(`./src/templates/tutorials${all}.js`),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                currentPage: i + 1,
                totalPages: numPages,
                slug: slug,
                titleTag: titleTag,
              },
            })
          })
        }
        return
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
