import React, { Component, Fragment } from "react"
import { graphql, StaticQuery, navigate } from "gatsby"
import {
  Button,
  Container,
  Menu,
  Segment,
  Dropdown,
  Visibility,
} from "semantic-ui-react"
import HomepageHeading from "./HomepageHeading"
import Cart from "./Cart"
import { isAuth } from "../utils/helpers"

class DesktopHeader extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { indexPage, setCartAddToBasket } = this.props
    const { fixed } = this.props

    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                sign_up_slug
                homepage_slug
                category_slug
                login_slug
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
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign="center"
              style={{
                minHeight: indexPage ? 300 : "auto",
                padding: "1em 0em",
              }}
              vertical
            >
              <Menu
                fixed={fixed ? "top" : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size="large"
              >
                <Container>
                  <Menu.Item
                    as="a"
                    active
                    onClick={() =>
                      navigate(data.site.siteMetadata.homepage_slug)
                    }
                  >
                    Home
                  </Menu.Item>

                  <Dropdown text="Product Categories" item simple>
                    <Dropdown.Menu>
                      <Dropdown.Header>Categories</Dropdown.Header>

                      {data.ecommerce.categories &&
                        data.ecommerce.categories.map(({ name }, index) => (
                          <Dropdown.Item
                            key={`dropdown_category_name_${index}`}
                            onClick={() =>
                              navigate(
                                `${
                                  data.site.siteMetadata.category_slug
                                }${name.toLowerCase()}/`
                              )
                            }
                          >
                            {name}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Menu.Item position="right">
                    {!isAuth() && (
                      <Fragment>
                        <Button
                          as="a"
                          inverted={!fixed}
                          onClick={() =>
                            navigate(data.site.siteMetadata.login_slug)
                          }
                        >
                          Log in
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(data.site.siteMetadata.sign_up_slug)
                          }
                          as="a"
                          inverted={!fixed}
                          primary={fixed}
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </Fragment>
                    )}

                    <Cart setCartAddToBasket={setCartAddToBasket} />
                    {isAuth() && (
                      <Button
                        as="a"
                        inverted
                        basic
                        style={{ marginLeft: "0.25em" }}
                      >
                        Logout
                      </Button>
                    )}
                  </Menu.Item>
                </Container>
              </Menu>
              <HomepageHeading indexPage={indexPage} />
            </Segment>
          </Visibility>
        )}
      />
    )
  }
}

export default DesktopHeader
