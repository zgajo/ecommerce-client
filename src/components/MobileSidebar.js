import React from "react"
import { graphql, StaticQuery, push } from "gatsby"

import { Menu, Sidebar, Dropdown } from "semantic-ui-react"

const MobileSidebar = ({ handleSidebarHide, sidebarOpened }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            sign_up_slug
            category_slug
            homepage_slug
          }
        }
        ecommerce {
          categories {
            name
          }
        }
      }
    `}
    render={data => (
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item
          as="a"
          active
          onClick={() => push(data.site.siteMetadata.homepage_slug)}
        >
          Home
        </Menu.Item>

        <Dropdown text="Product Categories" item simple>
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>

            {data.ecommerce.categories &&
              data.ecommerce.categories.map(({ name }) => (
                <Dropdown.Item onClick={() => push(name.toLowerCase())}>
                  {name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item as="a">Log in</Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => push(data.site.siteMetadata.sign_up_slug)}
        >
          Sign Up
        </Menu.Item>
      </Sidebar>
    )}
  />
)

export default MobileSidebar
