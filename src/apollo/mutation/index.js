import gql from "graphql-tag"

export const signupCustomerWithGoogle = gql`
  mutation($googleAuthToken: String!) {
    signupCustomerGoogle(googleAuthToken: $googleAuthToken) {
      message
      success
    }
  }
`

export const signupCustomer = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $password_confirm: String!
    $shipping_region_id: ID!
    $credit_card: String
    $address_1: String
    $address_2: String
    $city: String
    $region: String
    $postal_code: String
    $country: String
    $day_phone: String
    $eve_phone: String
    $mob_phone: String
  ) {
    signupCustomer(
      input: {
        name: $name
        email: $email
        password: $password
        password_confirm: $password_confirm
        shipping_region_id: $shipping_region_id
        credit_card: $credit_card
        address_1: $address_1
        address_2: $address_2
        city: $city
        region: $region
        postal_code: $postal_code
        country: $country
        day_phone: $day_phone
        eve_phone: $eve_phone
        mob_phone: $mob_phone
      }
    ) {
      message
      success
    }
  }
`

export const signupCustomerConfirm = gql`
  mutation($token: String!) {
    signupCustomerConfirm(token: $token) {
      message
      success
    }
  }
`

export const loginCustomer = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      success
      token
    }
  }
`
