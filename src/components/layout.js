import React, { Component } from "react"
import { PropTypes } from "prop-types"
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from "semantic-ui-react"

import Footer from "./Footer"
import HomepageHeading from "./HomepageHeading"
import MobileSidebar from "./MobileSidebar"
import Cart from "./Cart"

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined"

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  render() {
    const { children, header } = this.props

    return (
      <Responsive
        getWidth={getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
        id="Site"
      >
        {header}

        <div id="Site-content">{children}</div>

        <Footer />
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, indexPage } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <MobileSidebar
          handleSidebarHide={this.handleSidebarHide}
          sidebarOpened={sidebarOpened}
        />

        <Sidebar.Pusher dimmed={sidebarOpened} id="Site">
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Cart />
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading indexPage={indexPage} mobile />
          </Segment>

          <div id="Site-content">{children}</div>
          <Footer />
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children, ...rest }) => (
  <div>
    <DesktopContainer {...rest}>{children}</DesktopContainer>
    <MobileContainer {...rest}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export { ResponsiveContainer }
