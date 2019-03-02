module.exports = {
  siteMetadata: {
    homepage_title: `T-shirt eCommerce Shop`,
    homepage_slug: "/",
    login_slug: "/login/",
    sign_up_slug: "/sign_up/",
    category_slug: "/category/",
    server_images_folder: "/product_images",
    DEFAULT_LIMIT: 9,
    DEFAULT_OFFSET: 0,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,

    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "ECOMMERCE",
        // This is field under which it's accessible
        fieldName: "ecommerce",
        // Url to query from
        url: "http://localhost:4000",
      },
    },
  ],
}
