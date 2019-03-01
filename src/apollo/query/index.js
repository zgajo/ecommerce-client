import gql from "graphql-tag"

export const categoryProducts = gql`
  query(
    $category_id: ID!
    $limit: Int
    $offset: Int
    $attribute_value_ids: [Int!]
  ) {
    category_products(
      where: {
        category_id: $category_id
        attribute_value_ids: $attribute_value_ids
      }
      limit: $limit
      offset: $offset
    ) {
      product_id
      name
      description
      price
      price
      discounted_price
      image
      image_2
      thumbnail
    }
  }
`
