import React, { Component } from "react"
import { Button } from "semantic-ui-react"

export default class BuyButton extends Component {
  componentDidMount = () => {
    this.stripe = window.StripeCheckout.configure({
      key: process.env.GATSBY_STRIPE_API_TEST_KEY,
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",

      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      },
    })
  }

  stripeCheckout = () => {
    const { total_price, total_items } = this.props

    this.stripe.open({
      name: "Turing Ecommerce",
      description: `${total_items} item(s)`,
      currency: "usd",
      amount: total_price * 100, // it's using cents, transfering to dollars
    })
  }

  render() {
    return (
      <Button fluid positive onClick={this.stripeCheckout}>
        Proceed to Stripe checkout
      </Button>
    )
  }
}
