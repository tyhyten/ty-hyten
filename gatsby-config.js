module.exports = {
  siteMetadata: {
    title: `Ty Hyten`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-module-resolver",
      options: {
        root: "./src",
        aliases: {
          "@components": "./components",
          "@hooks": "./components/hooks",
          "@providers": "./providers",
          "@data": "./data",
          "@styles": "./styles",
          static: {
            root: "./public",
            alias: "./static",
          },
        },
      },
    },
  ],
}
