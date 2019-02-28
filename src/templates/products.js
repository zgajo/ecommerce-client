import React, { Component } from "react"
import { graphql } from "gatsby"
import {
  Segment,
  Grid,
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
import CategorySidebar from "../components/CategorySidebar"

class Categories extends Component {
  state = {
    category_products: this.props.data.ecommerce.category_products,
    filters: {
      // sizes: [],
      // colors: [],
    },
  }

  /**
   * ***************** FILTERING ************************
   */
  changeCheckboxState = filtersKey => name => (e, { value }) => {
    console.log(filtersKey, name, value)
    let filters = { ...this.state.filters }
    if (!filters[filtersKey]) {
      filters = {
        ...filters,
        [filtersKey]: [],
      }
    }

    let filtered = [...filters[filtersKey]]

    if (filtered.some(obj => obj[value])) {
      filtered = filtered.filter(obj => !obj[value])
    } else {
      filtered.push({ [value]: name })
    }

    this.setState(
      prev => ({
        ...prev,
        filters: {
          ...filters,
          [filtersKey]: filtered,
        },
      }),
      () => console.log(this.state)
    )
  }
  /**
   * ************************************************
   */

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
    const { category_products } = this.state

    return (
      <ResponsiveContainer>
        <Segment style={{ padding: "4em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid>
              <Grid.Column width={4}>
                <CategorySidebar
                  changeCheckboxState={this.changeCheckboxState}
                  filters={this.state.filters}
                />
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
