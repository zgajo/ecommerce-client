import React, { Component } from "react"
import {
  Button,
  Icon,
  Label,
  Popup,
  Item,
  Header,
  Divider,
} from "semantic-ui-react"
import { decimalNumbersTwoDigits, round } from "../utils/helpers"
import BuyButton from "./BuyButton"

export default class Cart extends Component {
  state = {
    order_details: [],
    total_amount: decimalNumbersTwoDigits(0),
  }

  componentDidMount = () => {
    if (this.props.setCartAddToBasket)
      this.props.setCartAddToBasket(this.addToCart)
  }

  addToCart = new_order_detail => {
    const { order_details } = this.state

    const sameProductInserted = order_details.find(od => {
      if (
        od.product_id === new_order_detail.product_id &&
        od.attributes === new_order_detail.attributes
      ) {
        return true
      }
      return false
    })

    if (sameProductInserted) {
      // add quantity
      this.setState(
        prev => ({
          order_details: prev.order_details.map(od => {
            if (
              od.product_id === new_order_detail.product_id &&
              od.attributes === new_order_detail.attributes
            ) {
              return {
                ...od,
                quantity:
                  Number(od.quantity) + Number(new_order_detail.quantity),
              }
            } else {
              return od
            }
          }),
        }),
        this.recalculateTotals
      )
    } else {
      //add to order_details
      this.setState(
        prev => ({
          order_details: [...prev.order_details, new_order_detail],
        }),
        this.recalculateTotals
      )
    }
  }

  removeFromCart = index => {
    this.setState(
      {
        order_details: this.state.order_details.filter((od, i) => index !== i),
      },
      this.recalculateTotals
    )
  }

  recalculateTotals = () => {
    const { order_details } = this.state

    this.setState({
      total_amount: order_details.reduce((total, curr) => {
        total += curr.unit_cost * curr.quantity
        return total
      }, 0),
    })
  }

  orderDetailAttributeValues = od => {
    const attributes = JSON.parse(od.attributes)

    return Object.keys(attributes)
      .map(attribute_id => {
        return attributes[attribute_id].value
      })
      .join(" ")
  }

  render() {
    const { order_details } = this.state

    if (!order_details.length) {
      return (
        <Button as="a" style={{ marginLeft: "0.5em" }}>
          <Icon name="cart" /> Cart
          <Label color="red" floating>
            {order_details.length}
          </Label>
        </Button>
      )
    }

    const total_items = order_details.reduce(
      (qty, curr) => (qty += curr.quantity),
      0
    )

    const total_price = decimalNumbersTwoDigits(
      order_details.reduce((total, od) => {
        const product_price = round(od.quantity * od.unit_cost)

        const new_total = round(total + product_price)

        return new_total
      }, 0)
    )

    return (
      <Popup
        trigger={
          <Button as="a" style={{ marginLeft: "0.5em" }}>
            <Icon name="cart" /> Cart
            <Label color="red" floating>
              {order_details.length}
            </Label>
          </Button>
        }
        flowing
        hoverable
        // open
        style={{ width: 350 }}
      >
        <Item.Group divided style={{ maxHeight: 300, overflowY: "auto" }}>
          {order_details.map((od, index) => (
            <Item key={`order_detail_${index}`}>
              <Item.Image
                size="tiny"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />

              <Item.Content>
                <Item.Extra style={{ margin: 0 }}>
                  <Button
                    icon
                    basic
                    floated="right"
                    style={{ marginTop: 0 }}
                    size="tiny"
                    onClick={() => this.removeFromCart(index)}
                  >
                    <Icon name="remove" />
                  </Button>
                  <Header as="h4" style={{ marginTop: 0 }}>
                    {od.product_name}
                  </Header>
                </Item.Extra>
                <Item.Meta className="cart_content_both_sides center_vertically">
                  <span className="cinema">{`${
                    od.quantity
                  } x ${this.orderDetailAttributeValues(od)}`}</span>
                  <span className="cinema">
                    <Header as="h4" color="red">
                      ${decimalNumbersTwoDigits(od.quantity * od.unit_cost)}
                    </Header>
                  </span>
                </Item.Meta>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
        <Divider />
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Meta className="cart_content_both_sides center_vertically">
                <span>{total_items} item(s)</span>
                <span className="cinema">
                  <Header as="h4" color="red">
                    ${total_price}
                  </Header>
                </span>
              </Item.Meta>
              <Item.Meta>
                <BuyButton
                  total_items={total_items}
                  total_price={total_price}
                />
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </Popup>
    )
  }
}
