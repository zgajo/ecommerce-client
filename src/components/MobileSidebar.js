import React, { Component } from "react"
import { graphql, StaticQuery, navigate } from "gatsby"

import { Menu, Sidebar, Icon, List } from "semantic-ui-react"

class MobileSidebar extends Component {
  state = { active: false }

  handleClick = () => this.setState(prev => ({ active: !prev.active }))

  render() {
    const { handleSidebarHide, sidebarOpened } = this.props
    const { active } = this.state

    return (
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
              onClick={() => navigate(data.site.siteMetadata.homepage_slug)}
            >
              Home
            </Menu.Item>

            <Menu.Item onClick={this.handleClick}>
              {(!active && <Icon name="triangle right" />) || null}
              {(active && <Icon name="triangle down" />) || null}
              Product Categories
            </Menu.Item>

            {(active &&
              data.ecommerce.categories &&
              data.ecommerce.categories.map(({ name }) => (
                <Menu.Item
                  onClick={() =>
                    navigate(
                      `${
                        data.site.siteMetadata.category_slug
                      }${name.toLowerCase()}/`
                    )
                  }
                >
                  <List.Item style={{ paddingTop: 0, paddingBottom: 0 }}>
                    {name}
                  </List.Item>
                </Menu.Item>
              ))) ||
              null}

            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => navigate(data.site.siteMetadata.sign_up_slug)}
            >
              Sign Up
            </Menu.Item>
          </Sidebar>
        )}
      />
    )
  }
}

export default MobileSidebar
