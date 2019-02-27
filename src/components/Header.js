import React from "react"
import { graphql, StaticQuery, push, Link } from "gatsby"

import { Button, Container, Menu, Segment } from "semantic-ui-react"
import HomepageHeading from "./HomepageHeading"

const DesktopHeader = ({ fixed, indexPage }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            sign_up_slug
            homepage_slug
          }
        }
      }
    `}
    render={data => (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: indexPage ? 300 : "auto", padding: "1em 0em" }}
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
              onClick={() => push(data.site.siteMetadata.homepage_slug)}
            >
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>

            <Menu.Item position="right">
              <Button as="a" inverted={!fixed}>
                Log in
              </Button>
              <Link to={data.site.siteMetadata.sign_up_slug}>
                <Button
                  as="a"
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: "0.5em" }}
                >
                  Sign Up
                </Button>
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
        <HomepageHeading indexPage={indexPage} />
      </Segment>
    )}
  />
)

export default DesktopHeader
