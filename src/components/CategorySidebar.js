import React from "react"
import { graphql, navigate, StaticQuery } from "gatsby"
import { Menu } from "semantic-ui-react"

const CategorySidebar = () => (
  <StaticQuery
    query={graphql`
      query {
        sitePage {
          path
        }
        site {
          siteMetadata {
            category_slug
            DEFAULT_LIMIT
            DEFAULT_OFFSET
          }
        }
        ecommerce {
          categories {
            name
            department {
              department_id
              name
              description
            }
          }
        }
      }
    `}
    render={data => (
      <Menu fluid vertical tabular>
        {data.ecommerce.categories &&
          data.ecommerce.categories.map(({ name }, index) => (
            <Menu.Item
              key={"category_" + index}
              name={name}
              active={data.sitePage.path.includes(name.toLowerCase())}
              onClick={() =>
                navigate(
                  `${
                    data.site.siteMetadata.category_slug
                  }/${name.toLowerCase()}/`
                )
              }
            />
          ))}
      </Menu>
    )}
  />
)

export default CategorySidebar
