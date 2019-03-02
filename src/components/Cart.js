import React, { Component } from "react"
import { Button, Icon, Label } from "semantic-ui-react"

export default class Cart extends Component {
  render() {
    return (
      <Button as="a" style={{ marginLeft: "0.5em" }}>
        <Icon name="cart" /> Cart
        <Label color="red" floating>
          22
        </Label>
      </Button>
    )
  }
}
