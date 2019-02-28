import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Menu, Checkbox } from "semantic-ui-react"

const CategorySidebar = ({ filters, changeCheckboxState }) => (
  <StaticQuery
    query={graphql`
      query {
        sitePage {
          path
        }
        ecommerce {
          attributes {
            attribute_id
            name
            attribute_values {
              attribute_value_id
              value
            }
          }
        }
      }
    `}
    render={({ ecommerce: { attributes } }) => (
      <Menu vertical>
        {attributes &&
          attributes.map(attribute => {
            const { attribute_values } = attribute
            const att_name = attribute.name.toLowerCase() + "s"

            return (
              <Menu.Item key={`attribute_${attribute.attribute_id}`}>
                <Menu.Header>{attribute.name}</Menu.Header>

                <Menu.Menu>
                  {attribute_values.map(av => {
                    return (
                      <Menu.Item
                        key={`av_${av.attribute_value_id}`}
                        name="enterprise"
                      >
                        <Checkbox
                          label={av.value}
                          value={av.attribute_value_id}
                          checked={
                            (filters[att_name] &&
                              filters[att_name].length &&
                              filters[att_name].some(
                                obj => obj[av.attribute_value_id]
                              )) ||
                            false
                          }
                          onChange={changeCheckboxState(att_name)(av.value)}
                        />
                      </Menu.Item>
                    )
                  })}
                </Menu.Menu>
              </Menu.Item>
            )
          })}
      </Menu>
    )}
  />
)

export default CategorySidebar
