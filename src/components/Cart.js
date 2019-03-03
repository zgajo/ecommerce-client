import React, { Component } from "react"
import { Button, Icon, Label, Popup, Item, Header } from "semantic-ui-react"

export default class Cart extends Component {
  state = {
    order: {
      order_details: [],
      total_amount: "0.00",
    },
  }

  addToCart = () => {}
  removeFromCart = () => {}

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
