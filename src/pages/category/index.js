import React, { Component } from "react"
import { graphql, push } from "gatsby"
import { Segment, Grid, Menu } from "semantic-ui-react"
import { ResponsiveContainer } from "../../components/layout"

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
                      name={name}
                      //   TODO: Active is based on slug
                      active={
                        data.sitePage.path.includes(name.toLowerCase()) ||
                        index === 0
                      }
                      onClick={() =>
                        push(
                          `${
                            data.site.siteMetadata.category_slug
                          }/${name.toLowerCase()}`
                        )
                      }
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
    sitePage {
      path
    }
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
`
