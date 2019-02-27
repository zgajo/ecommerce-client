import React, { Component } from "react"
import { Form, Input, Segment, Grid } from "semantic-ui-react"
import { GoogleLogin } from "react-google-login"
import { Helmet } from "react-helmet"

import { ResponsiveContainer } from "../components/layout"
import styles from "./sign_up.module.css"

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
]

const responseGoogle = response => {
  console.log(response)
}

class SignUp extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
      <ResponsiveContainer>
        <Helmet>
          <script src="https://apis.google.com/js/platform.js" async defer />
          <meta
            name="google-signin-client_id"
            content={process.env.GOOGLE_CLIENT_ID}
          />

          <title>My Title</title>
        </Helmet>

        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Form className={styles.form_width}>
              <Form.Group widths="equal">
                <Form.Input fluid label="Name" required placeholder="Name" />
                <Form.Input
                  fluid
                  required
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
                <Form.Input
                  fluid
                  required
                  label="Confirm password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group widths="2">
                <Form.Input
                  fluid
                  label="Credit card"
                  placeholder="Credit card no."
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Address 1" placeholder="Address 1" />
                <Form.Input fluid label="Address 2" placeholder="Address 2" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="City" placeholder="City" />
                <Form.Input
                  fluid
                  label="Postal code"
                  placeholder="Postal code"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Region" placeholder="Region" />
                <Form.Input fluid label="Country" placeholder="Country" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  required
                  label="Shipping region"
                  options={options}
                  placeholder="Shipping region"
                />
                <Form.Input fluid label="Country" placeholder="Country" />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Mob Number</label>
                  <Input
                    placeholder="(xxx)"
                    icon="mobile alternate"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Day phone</label>
                  <Input
                    placeholder="(xxx)"
                    icon="mobile alternate"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Eve phone</label>
                  <Input
                    placeholder="(xxx)"
                    icon="mobile alternate"
                    iconPosition="left"
                  />
                </Form.Field>
              </Form.Group>

              <Form.Button>Submit</Form.Button>

              <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID} //CLIENTID NOT CREATED YET
                buttonText="SIGNUP WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </Form>
          </Grid>
        </Segment>
      </ResponsiveContainer>
    )
  }
}

export default SignUp
