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
} from "semantic-ui-react"
import { isInteger } from "../utils/helpers"
import DesktopHeader from "../components/Header"

export default class Product extends Component {
  state = {
    mainImg: this.props.pageContext.product.image,
    secondaryImg: this.props.pageContext.product.image_2,
    qty: 1,
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

  increment = () => this.setState(prev => ({ qty: Number(prev.qty) + 1 }))
  decrement = () =>
    this.setState(prev => ({
      qty: prev.qty > 1 ? Number(prev.qty) - 1 : prev.qty,
    }))
  onQtyChange = ({ target: { value } }) => {
    if (isInteger(value) && value > 0) {
      this.setState({ qty: value })
    }
  }

  render() {
    const {
      pageContext: { product, server_images_folder },
    } = this.props
    const { mainImg, secondaryImg, qty } = this.state

    const avg_rating = this.calculateReviews(product.reviews)

    return (
      <ResponsiveContainer header={<DesktopHeader />}>
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
                      <Grid.Column>Color picker</Grid.Column>
                      <Grid.Column>Size picker</Grid.Column>
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
                            value={qty}
                            style={{ textAlign: "center" }}
                            onChange={this.onQtyChange}
                          />
                          <Label basic onClick={this.increment}>
                            <Icon name="add" className="label_amount" />
                          </Label>
                        </Input>
                      </Grid.Column>
                      <Grid.Column>Add to cart</Grid.Column>
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
