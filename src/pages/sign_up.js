import React, { Component } from "react"
import { Form, Input, Segment, Message, Container } from "semantic-ui-react"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { Helmet } from "react-helmet"
import { Formik } from "formik"

import { ResponsiveContainer } from "../components/layout"
import styles from "./sign_up.module.css"
import { client } from "../apollo"
import { signupCustomerWithGoogle } from "../apollo/mutation"
import { asyncAction, formatErrors } from "../utils/helpers"

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
]

class SignUp extends Component {
  state = {
    customer: {
      name: "",
      email: "",
      password_confirm: "",
      password: "",
      credit_card: "",
      address_1: "",
      address_2: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
      shipping_region_id: "",
      day_phone: "",
      eve_phone: "",
      mob_phone: "",
    },
    error: "",
  }

  handleChange = (e, { value }) => this.setState({ value })

  responseGoogle = async response => {
    let [error, data] = await asyncAction(
      client.mutate({
        mutation: signupCustomerWithGoogle,
        variables: {
          googleAuthToken: response.accessToken,
        },
      })
    )

    if (error) {
      this.setState({
        ...formatErrors(error, this.state),
      })
    }
    if (data) {
    }
  }

  responseFacebook = response => {
    console.log(response)
  }

  render() {
    const { error } = this.state

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
        <Container style={{ padding: "2em 0em" }}>
          <Segment>
            <div className="center_vertically">
              <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID} //CLIENTID NOT CREATED YET
                buttonText="SIGNUP WITH GOOGLE"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                autoLoad={false}
                style={{
                  color: "#444",
                }}
              />

              <FacebookLogin
                cssClass="facebook_login"
                appId={process.env.FACEBOOK_APP_ID}
                autoLoad={false}
                textButton="SIGNUP WITH FACEBOOK"
                fields="name,email,picture"
                callback={this.responseFacebook}
                style={{ height: 43 }}
                size="medium"
                icon="fa-facebook"
              />
            </div>
            {error && (
              <Message negative>
                <Message.Header>There was some error</Message.Header>
                <p>{error}</p>
              </Message>
            )}

            <Formik
              initialValues={this.state.customer}
              handleChange={this.changeField}
              render={({
                values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                setFieldValue,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form className={styles.form_width}>
                  <br />

                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Name"
                      required
                      onChange={handleChange}
                      value={values.name}
                      placeholder="Name"
                      name="name"
                    />
                    <Form.Input
                      fluid
                      required
                      label="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="email@example.com"
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      required
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      label="Password"
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Input
                      fluid
                      required
                      label="Confirm password"
                      name="password_confirm"
                      onChange={handleChange}
                      value={values.password_confirm}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group widths="2">
                    <Form.Input
                      fluid
                      name="credit_card"
                      value={values.credit_card}
                      onChange={handleChange}
                      label="Credit card"
                      placeholder="Credit card no."
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Address 1"
                      name="address_1"
                      value={values.address_1}
                      onChange={handleChange}
                      placeholder="Address 1"
                    />
                    <Form.Input
                      fluid
                      name="address_2"
                      value={values.address_2}
                      label="Address 2"
                      onChange={handleChange}
                      placeholder="Address 2"
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="city"
                      value={values.city}
                      label="City"
                      placeholder="City"
                      onChange={handleChange}
                    />
                    <Form.Input
                      onChange={handleChange}
                      name="postal_code"
                      value={values.postal_code}
                      fluid
                      label="Postal code"
                      placeholder="Postal code"
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="region"
                      value={values.region}
                      label="Region"
                      placeholder="Region"
                      onChange={handleChange}
                    />
                    <Form.Input
                      fluid
                      name="country"
                      value={values.country}
                      label="Country"
                      placeholder="Country"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths="2">
                    <Form.Select
                      fluid
                      name="shipping_region_id"
                      value={values.shipping_region_id}
                      onChange={(e, { value }) =>
                        setFieldValue("shipping_region_id", value)
                      }
                      required
                      selection
                      label="Shipping region"
                      options={options}
                      placeholder="Shipping region"
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Mob Number</label>
                      <Input
                        name="mob_phone"
                        value={values.mob_phone}
                        placeholder="(xxx)"
                        icon="mobile alternate"
                        onChange={handleChange}
                        iconPosition="left"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Day phone</label>
                      <Input
                        placeholder="(xxx)"
                        name="day_phone"
                        value={values.day_phone}
                        icon="mobile alternate"
                        onChange={handleChange}
                        iconPosition="left"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Eve phone</label>
                      <Input
                        placeholder="(xxx)"
                        name="eve_phone"
                        value={values.eve_phone}
                        onChange={handleChange}
                        icon="mobile alternate"
                        iconPosition="left"
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Button>Submit</Form.Button>
                </Form>
              )}
            />
          </Segment>
        </Container>
      </ResponsiveContainer>
    )
  }
}

export default SignUp
