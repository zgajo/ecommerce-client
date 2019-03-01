const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      site {
        siteMetadata {
          category_slug
          DEFAULT_OFFSET
          DEFAULT_LIMIT
        }
      }
      ecommerce {
        categories {
          category_id
          name
        }
        products {
          product_id
          name
        }
      }
    }
  `).then(result => {
    result.data.ecommerce.categories.forEach(({ name, category_id }) => {
      createPage({
        path: `${
          result.data.site.siteMetadata.category_slug
        }${name.toLowerCase()}/`,
        component: path.resolve(`./src/templates/products.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: name,
          category_id: category_id,
          limit: result.data.site.siteMetadata.DEFAULT_LIMIT,
          offset: result.data.site.siteMetadata.DEFAULT_OFFSET,
        },
      })
    })

    result.data.ecommerce.products.forEach(({ product_id, name }) => {
      createPage({
        path: `product/${product_id}/`,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          product_name: name,
        },
      })
    })
  })
}
