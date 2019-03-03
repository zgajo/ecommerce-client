import React, { Component } from "react"
import { Button, Icon, Label, Popup, Item, Header } from "semantic-ui-react"
import { decimalNumbersTwoDigits } from "../utils/helpers"

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
            if (od.product_id === new_order_detail.product_id) {
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

  render() {
    return (
      <Popup
        trigger={
          <Button as="a" style={{ marginLeft: "0.5em" }}>
            <Icon name="cart" /> Cart
            <Label color="red" floating>
              22
            </Label>
          </Button>
        }
        flowing
        hoverable
        // open
      >
        <Item.Group divided>
          <Item>
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
                >
                  <Icon name="remove" />
                </Button>
                <Header as="h3" style={{ marginTop: 0 }}>
                  My Neighbor Totoro asdsadasdasdasasdasd
                </Header>
              </Item.Extra>
              <Item.Meta className="cart_content_both_sides center_vertically">
                <span className="cinema">IFC Cinema</span>
                <span className="cinema">
                  <Header as="h4" color="red">
                    Price
                  </Header>
                </span>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </Popup>
    )
  }
}
