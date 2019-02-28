import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { Segment, Grid, Menu } from "semantic-ui-react"
import { ResponsiveContainer } from "../components/layout"

class Categories extends Component {
  render() {
    const { data } = this.props

    return (
      <ResponsiveContainer>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                {data.ecommerce.categories &&
                  data.ecommerce.categories.map(({ name }, index) => (
                    <Menu.Item
                      key={`category_name_${index}`}
                      name={name}
                      // active={window.location.href.includes(name.toLowerCase())}
                      onClick={() => {
                        navigate(
                          `${
                            data.site.siteMetadata.category_slug
                          }/${name.toLowerCase()}/`
                        )
                      }}
                    />
                  ))}
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12}>
              <Segment>
                This is an stretched grid column. This segment will always match
                the tab height This is an stretched grid column. This segment
                will always match the tab height This is an stretched grid
                column. This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height This is an stretched grid column.
                This segment will always match the tab height This is an
                stretched grid column. This segment will always match the tab
                height This is an stretched grid column. This segment will
                always match the tab height
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </ResponsiveContainer>
    )
  }
}

export default Categories

export const query = graphql`
  query {
    site {
      siteMetadata {
        category_slug
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
        products {
          product_id
          name
          price
          price
          discounted_price
          image
          image_2
          thumbnail
        }
      }
    }
  }
`