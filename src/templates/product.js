import React, { Component } from "react"
import { ResponsiveContainer } from "../components/layout"
import {
  Segment,
  Container,
  Grid,
  Image,
  Rating,
  Header,
  Label,
  Input,
  Icon,
  Button,
} from "semantic-ui-react"
import { isInteger, removeDuplicateInts } from "../utils/helpers"
import DesktopHeader from "../components/Header"

export default class Product extends Component {
  state = {
    mainImg: this.props.pageContext.product.image,
    secondaryImg: this.props.pageContext.product.image_2,
    order_detail: {
      attributes: "{}",
      product_id: this.props.pageContext.product.product_id,
      product_name: this.props.pageContext.product.name,
      quantity: 1,
      unit_cost:
        this.props.pageContext.product.discounted_price ||
        this.props.pageContext.product.price,
    },
  }

  initialOrderDetail = {
    attributes: "{}",
    product_id: this.props.pageContext.product.product_id,
    product_name: this.props.pageContext.product.name,
    quantity: 1,
    unit_cost:
      this.props.pageContext.product.discounted_price ||
      this.props.pageContext.product.price,
  }

  changeMainImg = () => {
    const {
      pageContext: { product },
    } = this.props

    this.setState({
      mainImg:
        this.state.mainImg === product.image ? product.image_2 : product.image,
      secondaryImg:
        this.state.mainImg !== product.image ? product.image_2 : product.image,
    })
  }

  calculateReviews = reviews => {
    if (!reviews.length) return 0

    return reviews.reduce((total, curr) => (total += curr.rating), 0)
  }

  increment = () =>
    this.setState(prev => ({
      ...prev,
      order_detail: {
        ...prev.order_detail,
        quantity: Number(prev.order_detail.quantity) + 1,
      },
    }))
  decrement = () =>
    this.setState(prev => ({
      ...prev,
      order_detail: {
        ...prev.order_detail,
        quantity:
          prev.order_detail.quantity > 1
            ? Number(prev.order_detail.quantity) - 1
            : prev.order_detail.quantity,
      },
    }))
  onQtyChange = ({ target: { value } }) => {
    if (isInteger(value) && value > 0) {
      this.setState(prev => ({
        ...prev,
        order_detail: {
          ...prev.order_detail,
          quantity: value,
        },
      }))
    }
  }

  pickAttributeValue = attribute_value => () => {
    const { order_detail } = this.state

    let attributes = JSON.parse(order_detail.attributes)
    attributes = JSON.stringify({
      ...attributes,
      [attribute_value.attribute_id]: { ...attribute_value },
    })

    this.setState(prev => ({
      ...prev,
      order_detail: {
        ...prev.order_detail,
        attributes,
      },
    }))
  }

  attributeValuePicked = attribute_value => {
    const { order_detail } = this.state

    let attributes = JSON.parse(order_detail.attributes)
    return (
      !!attributes[attribute_value.attribute_id] &&
      attributes[attribute_value.attribute_id].attribute_value_id ===
        attribute_value.attribute_value_id
    )
  }

  addToBasketIsDisabled = () => {
    const { product_attribute_values } = this.props.pageContext.product
    const { order_detail } = this.state

    let attributes = JSON.parse(order_detail.attributes)

    // all product atrributes
    const product_attributes = removeDuplicateInts(
      product_attribute_values.map(({ attribute_id }) => attribute_id)
    )
    // all picked
    const picked_product_attributes = Object.keys(attributes)

    if (picked_product_attributes.length < product_attributes.length)
      return true

    // check every element
    var arr1 = product_attributes.concat().sort()
    var arr2 = picked_product_attributes.concat().sort()

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return true
    }

    return false
  }

  cartAddToBasket = () => {}

  // Passing function from cart to insert new item
  setCartAddToBasket = fun => {
    this.cartAddToBasket = fun
  }

  addToBasket = () => {
    this.cartAddToBasket(this.state.order_detail)

    this.setState({
      order_detail: { ...this.initialOrderDetail },
    })
  }

  render() {
    const {
      pageContext: { product, server_images_folder, attributes },
    } = this.props
    const {
      mainImg,
      secondaryImg,
      order_detail: { quantity },
    } = this.state

    const avg_rating = this.calculateReviews(product.reviews)

    return (
      <ResponsiveContainer
        header={<DesktopHeader setCartAddToBasket={this.setCartAddToBasket} />}
      >
        <Container style={{ padding: "2em 0em" }} textAlign="center">
          <Segment>
            <Grid columns="equal">
              <Grid.Row stretched>
                <Grid.Column mobile="16" tablet="8" computer="8">
                  <Grid className="product_images_container">
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Image
                          src={`${
                            process.env.SERVER_URL
                          }${server_images_folder}/${mainImg}`}
                          as="img"
                          className="product_main_image"
                          centered
                          rounded
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <Image
                          src={`${
                            process.env.SERVER_URL
                          }${server_images_folder}/${secondaryImg}`}
                          as="img"
                          className="product_secondary_image"
                          onClick={this.changeMainImg}
                          centered
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column mobile="16" tablet="8" computer="8">
                  <Grid>
                    <Grid.Row columns={1} textAlign="left">
                      <Grid.Column>
                        <div className="center_vertically">
                          <Rating
                            as="span"
                            disabled
                            maxRating={5}
                            defaultRating={avg_rating}
                            icon="star"
                            size="large"
                          />
                          <span> {avg_rating || ""} </span>
                          <span
                            style={{
                              color: "#4183c4",
                            }}
                          >
                            {product.reviews.length} customer reviews
                          </span>
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h3">{product.name}</Header>
                      </Grid.Column>
                      <Grid.Column>
                        <label className="label">Price: </label>

                        <Label
                          as="a"
                          tag
                          size="large"
                          color="teal"
                          className={
                            (product.discounted_price && "line_through") || ""
                          }
                        >
                          ${product.price}
                        </Label>
                        {(product.discounted_price && (
                          <Label as="a" color="red" size="large" tag>
                            ${product.discounted_price}
                          </Label>
                        )) ||
                          ""}
                      </Grid.Column>
                      {attributes.map(attribute => (
                        <Grid.Column
                          key={`attribute_${attribute.attribute_id}`}
                        >
                          <Header as="h5">{attribute.name}:</Header>

                          {product.product_attribute_values
                            .filter(
                              atv => atv.attribute_id === attribute.attribute_id
                            )
                            .map(atv => (
                              <Button
                                basic={!this.attributeValuePicked(atv)}
                                color={
                                  this.attributeValuePicked(atv)
                                    ? "red"
                                    : "black"
                                }
                                onClick={this.pickAttributeValue(atv)}
                                className="product_attribute_values_button"
                                key={`avs_${atv.attribute_value_id}`}
                              >
                                {atv.value}
                              </Button>
                            ))}
                        </Grid.Column>
                      ))}

                      <Grid.Column>
                        <label className="label">QTY: </label>
                        <Input
                          labelPosition="right"
                          type="text"
                          className="amount"
                        >
                          <Label basic onClick={this.decrement}>
                            <Icon name="minus" className="label_amount" />
                          </Label>
                          <input
                            value={quantity}
                            style={{ textAlign: "center" }}
                            onChange={this.onQtyChange}
                          />
                          <Label basic onClick={this.increment}>
                            <Icon name="add" className="label_amount" />
                          </Label>
                        </Input>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          positive
                          onClick={this.addToBasket}
                          disabled={this.addToBasketIsDisabled()}
                        >
                          <Icon name="shop" /> Add to basket
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
        <Container style={{ padding: "2em 0em" }} textAlign="center">
          <Segment> Reviews </Segment>
        </Container>
      </ResponsiveContainer>
    )
  }
}
