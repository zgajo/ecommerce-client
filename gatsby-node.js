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
          server_images_folder
        }
      }
      ecommerce {
        categories {
          category_id
          name
        }
        attributes {
          attribute_id
          name
        }
        products {
          product_id
          name
          description
          price
          discounted_price
          image
          image_2
          thumbnail
          display
          categories {
            category_id
            name
            description
            department {
              department_id
              name
              description
            }
          }
          product_attribute_values {
            attribute_value_id
            attribute_id
            value
          }
          reviews {
            review_id
            review
            rating
            created_on
            customer {
              customer_id
              name
            }
          }
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

    result.data.ecommerce.products.forEach(product => {
      createPage({
        path: `product/${product.product_id}/`,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          product: product,
          server_images_folder:
            result.data.site.siteMetadata.server_images_folder,
          attributes: result.data.ecommerce.attributes,
        },
      })
    })
  })
}
