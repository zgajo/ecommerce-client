import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

import { Menu, Sidebar } from "semantic-ui-react"

const MobileSidebar = ({ handleSidebarHide, sidebarOpened }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            sign_up_slug
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
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Work</Menu.Item>
        <Menu.Item as="a">Company</Menu.Item>
        <Menu.Item as="a">Careers</Menu.Item>
        <Menu.Item as="a">Log in</Menu.Item>
        <Link to={data.site.siteMetadata.sign_up_slug}>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Link>
      </Sidebar>
    )}
  />
)

export default MobileSidebar
