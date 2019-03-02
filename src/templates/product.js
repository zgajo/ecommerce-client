import React from "react"
import { ResponsiveContainer } from "../components/layout"
import { Segment, Container, Grid } from "semantic-ui-react"

export default function Product(props) {
  return (
    <ResponsiveContainer>
      <Container style={{ padding: "2em 0em" }} textAlign="center">
        <Segment>
          <Grid columns="equal">
            <Grid.Row stretched>
              <Grid.Column>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>img main</Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3}>
                    <Grid.Column>img1</Grid.Column>
                    <Grid.Column>img2</Grid.Column>
                    <Grid.Column>img3</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column>Review</Grid.Column>
                    <Grid.Column>product name</Grid.Column>
                    <Grid.Column>product Price</Grid.Column>
                    <Grid.Column>Color picker</Grid.Column>
                    <Grid.Column>Size picker</Grid.Column>
                    <Grid.Column>quantity</Grid.Column>
                    <Grid.Column>Add to cart</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </ResponsiveContainer>
  )
}
