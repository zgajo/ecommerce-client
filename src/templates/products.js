import React, { Component } from "react"
import { graphql, Link } from "gatsby"
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
import DesktopHeader from "../components/Header"

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
    let filters = { ...this.state.filters }

    // dynamically generating filters properties
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
        category_products: [],
        filters: {
          ...filters,
          [filtersKey]: filtered,
        },
      }),
      () => {
        this.fetching = true
        this.offsetCounts = 0
        this.fetchMoreProducts(true)
      }
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

  async fetchMoreProducts(newQuery) {
    if (!newQuery) {
      this.offsetCounts += this.props.pageContext.limit
    }

    let attribute_value_ids = []

    if (this.state.filters.sizes && this.state.filters.sizes.length) {
      attribute_value_ids = attribute_value_ids.concat(
        this.state.filters.sizes.map(obj => Number(Object.keys(obj)[0])) // Graphql needs Int, so right now I'll do it on client side
      )
    }

    if (this.state.filters.colors && this.state.filters.colors.length) {
      attribute_value_ids = attribute_value_ids.concat(
        this.state.filters.colors.map(obj => Number(Object.keys(obj)[0]))
      )
    }

    let [error, data] = await asyncAction(
      client.query({
        query: categoryProducts,
        variables: {
          category_id: this.props.pageContext.category_id,
          limit: this.props.pageContext.limit,
          offset: this.offsetCounts,
          ...(attribute_value_ids &&
            attribute_value_ids.length && { attribute_value_ids }),
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
    const { server_images_folder } = this.props.data.site.siteMetadata

    return (
      <ResponsiveContainer header={<DesktopHeader />}>
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
                              src={`${
                                process.env.GATSBY_SERVER_URL
                              }${server_images_folder}/${product.image}`}
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
                                  <Link to={`/product/${product.product_id}`}>
                                    <Button>View more</Button>
                                  </Link>
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
        server_images_folder
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
