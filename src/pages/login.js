import React, { Component } from "react"
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"
import { ResponsiveContainer } from "../components/layout"
import { Link, navigate } from "gatsby"
import DesktopHeader from "../components/Header"
import { client } from "../apollo"
import { Formik } from "formik"
import { signupCustomerConfirm, loginCustomer } from "../apollo/mutation"
import { asyncAction } from "../utils/helpers"
import { LoginSchema } from "../utils/validation"

class LoginForm extends Component {
  state = {}

  async componentDidMount() {
    const { search } = this.props.location

    const token = search.substr(search.indexOf("=") + 1)

    if (token) {
      const [err, response] = await asyncAction(
        client.mutate({
          mutation: signupCustomerConfirm,
          variables: {
            token,
          },
        })
      )

      if (err) {
        this.setState({
          signupCustomerConfirm: {
            success: false,
            message: err[0],
          },
        })
      }

      this.setState({
        signupCustomerConfirm: response.data.signupCustomerConfirm,
      })
    }
  }

  render() {
    return (
      <ResponsiveContainer header={<DesktopHeader />}>
        <div style={{ marginTop: "3em" }}>
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Log-in to your account
              </Header>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (
                  values,
                  { setSubmitting, resetForm, setStatus }
                ) => {
                  const [, response] = await asyncAction(
                    client.mutate({
                      mutation: loginCustomer,
                      variables: values,
                    })
                  )

                  setSubmitting(false)
                  console.log(response.data)
                  if (response.data.login) {
                    if (response.data.login.success) {
                      resetForm()
                      localStorage.setItem(
                        "authorization",
                        response.data.login.token
                      )

                      navigate("/")
                      return
                    } else {
                      setStatus(response.data.login)
                    }
                  }
                }}
              >
                {({
                  errors,
                  handleChange,
                  touched,
                  handleSubmit,
                  status,
                  isSubmitting,
                }) => (
                  <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                      <Form.Input
                        fluid
                        icon="at"
                        name="email"
                        onChange={handleChange}
                        iconPosition="left"
                        placeholder="E-mail address"
                        error={!!errors.email && touched.email}
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        onChange={handleChange}
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        name="password"
                        error={!!errors.password && touched.password}
                      />

                      {status && (
                        <Message
                          negative={!status.success}
                          positive={status.success}
                          size="tiny"
                          style={{ width: "auto" }}
                        >
                          <Message.Header>{status.message}</Message.Header>
                        </Message>
                      )}

                      {!isSubmitting && (
                        <Button
                          color="teal"
                          fluid
                          size="large"
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          Login
                        </Button>
                      )}

                      {isSubmitting && (
                        <Button type="button" loading disabled={!isSubmitting}>
                          Submit
                        </Button>
                      )}
                    </Segment>
                  </Form>
                )}
              </Formik>
              <Message>
                New to us? <Link to="/sign_up">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            {this.state.signupCustomerConfirm && (
              <Message
                negative={!this.state.signupCustomerConfirm.success}
                positive={this.state.signupCustomerConfirm.success}
                size="tiny"
                style={{ width: "auto" }}
              >
                <Message.Header>
                  {this.state.signupCustomerConfirm.message}
                </Message.Header>
              </Message>
            )}
          </Grid>
        </div>
      </ResponsiveContainer>
    )
  }
}
export default LoginForm
