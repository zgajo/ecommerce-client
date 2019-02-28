import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import {
  Segment,
  Grid,
  Menu,
  Button,
  Icon,
  Card,
  Image,
  Dimmer,
} from "semantic-ui-react"
import { ResponsiveContainer } from "../components/layout"
import styles from "./products.module.css"

class Categories extends Component {
  state = {
    limit: this.props.data.site.siteMetadata.DEFAULT_LIMIT,
    offset: this.props.data.site.siteMetadata.DEFAULT_OFFSET,
    category_products: this.props.data.ecommerce.category_products,
  }

  componentDidMount = () => {
    const { category_products } = this.state
    const keys = category_products.map((product, index) => `active_${index}`)

    const actives = keys.reduce(
      (obj, curr) => (obj = { ...obj, [curr]: false }),
      {}
    )

    this.setState({ ...actives })
  }

  handleShow = key => () => this.setState({ [key]: true })
  handleHide = key => () => this.setState({ [key]: false })

  render() {
    const { data } = this.props
    const { category_products } = this.state

    return (
      <ResponsiveContainer>
        <Segment style={{ padding: "4em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  {data.ecommerce.categories &&
                    data.ecommerce.categories.map(({ name }, index) => (
                      <Menu.Item
                        key={"category_" + index}
                        name={name}
                        active={data.sitePage.path.includes(name.toLowerCase())}
                        onClick={() =>
                          navigate(
                            `${
                              data.site.siteMetadata.category_slug
                            }/${name.toLowerCase()}/`
                          )
                        }
                      />
                    ))}
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                {/* <Item.Group> */}
                <Grid columns="three">
                  {category_products &&
                    category_products.length &&
                    category_products.map((product, index) => {
                      return (
                        <Grid.Column key={`active_${index}`}>
                          <Dimmer.Dimmable
                            as={Card}
                            dimmed={this.state[`active_${index}`]}
                            onMouseEnter={this.handleShow(`active_${index}`)}
                            onMouseLeave={this.handleHide(`active_${index}`)}
                          >
                            <Image
                              fluid={true}
                              src={`${process.env.SERVER_URL}/product_images/${
                                product.image
                              }`}
                            />
                            <Card.Content>
                              <Card.Header>{product.name}</Card.Header>
                              <Card.Description
                                className={styles.items_card_description}
                                content={product.description}
                              />
                            </Card.Content>
                            <Card.Content extra>
                              <a href=":;">
                                <Icon name="user" />
                                10 Friends
                              </a>
                            </Card.Content>

                            <Dimmer
                              active={this.state[`active_${index}`]}
                              onClickOutside={this.handleHide(
                                `active_${index}`
                              )}
                              // verticalAlign="center"
                            >
                              <Grid textAlign="center">
                                <Grid.Row>
                                  <Button positive>
                                    <Icon name="shop" /> Add to basket
                                  </Button>
                                </Grid.Row>
                                <Grid.Row>
                                  <Button>View more</Button>
                                </Grid.Row>
                              </Grid>
                            </Dimmer>
                          </Dimmer.Dimmable>
                        </Grid.Column>
                      )
                    })}
                </Grid>
                {/* </Item.Group> */}
              </Grid.Column>
            </Grid>
          </Grid>
        </Segment>
      </ResponsiveContainer>
    )
  }
}

export default Categories

export const query = graphql`
  query($category_id: ID!, $limit: Int, $offset: Int) {
    sitePage {
      path
    }
    site {
      siteMetadata {
        category_slug
        DEFAULT_LIMIT
        DEFAULT_OFFSET
      }
    }
    ecommerce {
      categories {
        name
        department {
          department_id
          name
          description
        }
      }
      category_products(
        where: { category_id: $category_id }
        limit: $limit
        offset: $offset
      ) {
        product_id
        name
        description
        price
        price
        discounted_price
        image
        image_2
        thumbnail
      }
    }
  }
`
