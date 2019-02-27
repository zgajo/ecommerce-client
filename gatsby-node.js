const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      site {
        siteMetadata {
          category_slug
        }
      }
      ecommerce {
        categories {
          name
        }
      }
    }
  `).then(result => {
    result.data.ecommerce.categories.forEach(({ name }) => {
      createPage({
        path: `${
          result.data.site.siteMetadata.category_slug
        }/${name.toLowerCase()}`,
        component: path.resolve(`./src/templates/products.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: name,
        },
      })
    })
  })
}
