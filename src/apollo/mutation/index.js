import gql from "graphql-tag"

export const signupCustomerWithGoogle = gql`
  mutation($googleAuthToken: String!) {
    signupCustomerGoogle(googleAuthToken: $googleAuthToken)
  }
`
