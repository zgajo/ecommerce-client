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
import { client } from "../apollo"
import { categoryProducts } from "../apollo/query"
import { formatErrors, asyncAction } from "../utils/helpers"

class Categories extends Component {
  state = {
    category_products: this.props.data.ecommerce.category_products,
  }

  componentDidMount = () => {
    window.addEventListener(`scroll`, this.handleScroll)

    const { category_products } = this.state
    const keys = category_products.map((product, index) => `active_${index}`)

    const actives = keys.reduce(
      (obj, curr) => (obj = { ...obj, [curr]: false }),
      {}
    )

    this.setState({ ...actives })
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
  }

  hasMore = true
  fetching = false
  offsetCounts = this.props.pageContext.offset

  handleShow = key => () => this.setState({ [key]: true })
  handleHide = key => () => this.setState({ [key]: false })

  handleScroll = () => {
    // Scroll based on footer visibility position
    // While footer is not visible, scroll, if its visible, fetch data
    const distanceToBottom =
      document.documentElement.offsetHeight -
      document.getElementById("footer").getBoundingClientRect().top

    // Check if there are any more products
    // if current products are less than fetched - no more products
    const fetchMore =
      this.state.category_products.length >= this.props.pageContext.limit

    if (!this.fetching && this.hasMore && distanceToBottom > 0 && fetchMore) {
      // fetch data
      this.fetching = true
      this.fetchMoreProducts()
    }
  }

  async fetchMoreProducts() {
    this.offsetCounts += this.props.pageContext.limit
    let [error, data] = await asyncAction(
      client.query({
        query: categoryProducts,
        variables: {
          category_id: this.props.pageContext.category_id,
          limit: this.props.pageContext.limit,
          offset: this.offsetCounts,
        },
      })
    )

    if (error) {
      this.setState({
        ...formatErrors(error, this.state),
      })
    }
    if (data) {
      const { category_products } = data.data
      // we're retreiving limit peoducts each time,
      if (category_products.length < this.props.pageContext.limit) {
        this.hasMore = false
      }

      this.setState(
        {
          category_products: [
            ...this.state.category_products,
            ...category_products,
          ],
        },
        () => {
          this.fetching = false
        }
      )
    }
  }

  render() {
    const { data } = this.props
    const { category_products } = this.state

    return (
      <ResponsiveContainer>
        <Segment style={{ padding: "4em 0em" }} vertical>
          <div onScroll={this.handleScroller}>
            <Grid container stackable verticalAlign="middle">
              <Grid>
                <Grid.Column width={4}>
                  <Menu fluid vertical tabular>
                    {data.ecommerce.categories &&
                      data.ecommerce.categories.map(({ name }, index) => (
                        <Menu.Item
                          key={"category_" + index}
                          name={name}
                          active={data.sitePage.path.includes(
                            name.toLowerCase()
                          )}
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
                                src={`${
                                  process.env.SERVER_URL
                                }/product_images/${product.image}`}
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
          </div>
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
