import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Container, Header } from "semantic-ui-react"

const HomepageHeading = ({ mobile, indexPage }) => {
  if (!indexPage) {
    return null
  }

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              homepage_title
            }
          }
        }
      `}
      render={data => (
        <Container text>
          <Header
            as="h1"
            content={data.site.siteMetadata.homepage_title}
            inverted
            style={{
              fontSize: mobile ? "2em" : "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: mobile ? "0.75em" : "1em",
            }}
          />
        </Container>
      )}
    />
  )
}

export default HomepageHeading
