import React from "react"
import {
  Button,
  Container,
  Menu,
  Segment,
  Dropdown,
  Sidebar,
} from "semantic-ui-react"

const DesktopHeader = ({ fixed }) => (
  <Segment
    inverted
    textAlign="center"
    style={{ minHeight: 300, padding: "1em 0em" }}
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
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Work</Menu.Item>
        <Menu.Item as="a">Company</Menu.Item>
        <Menu.Item as="a">Careers</Menu.Item>
        <Dropdown text="Shopping" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item>
              <Dropdown text="Clothing">
                <Dropdown.Menu>
                  <Dropdown.Header>Mens</Dropdown.Header>
                  <Dropdown.Item>Shirts</Dropdown.Item>
                  <Dropdown.Item>Pants</Dropdown.Item>
                  <Dropdown.Item>Jeans</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Womens</Dropdown.Header>
                  <Dropdown.Item>Dresses</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Item>Bags</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item>
            <Dropdown.Item>Home Goods</Dropdown.Item>
            <Dropdown.Item>Bedroom</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Order</Dropdown.Header>
            <Dropdown.Item>Status</Dropdown.Item>
            <Dropdown.Item>Cancellations</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item position="right">
          <Button as="a" inverted={!fixed}>
            Log in
          </Button>
          <Button
            as="a"
            inverted={!fixed}
            primary={fixed}
            style={{ marginLeft: "0.5em" }}
          >
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  </Segment>
)

const MobileSidebar = ({ handleSidebarHide, sidebarOpened }) => (
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
    <Menu.Item as="a">Sign Up</Menu.Item>
  </Sidebar>
)

export { DesktopHeader, MobileSidebar }
