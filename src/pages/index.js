import React from "react"
import Header from "../components/Header"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Flex } from "rebass"
import "../styles/index.scss"

export default ({ data }) => {
  useStaticQuery(graphql`
    query {
      photographyImage: file(relativePath: { eq: "assets/photography.jpg" }) {
        childImageSharp {
          fluid(quality: 80, maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      developmentImage: file(relativePath: { eq: "assets/development.jpg" }) {
        childImageSharp {
          fluid(quality: 80, maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Header>
      <Flex mt={4} style={{ alignItems: "center" }}>
        <Box width={1 / 2}>
          <Img
            className="nav-image"
            fluid={data.photographyImage.childImageSharp.fluid}
          />
        </Box>
        <div style={{ margin: "0 40px" }}>
          <h2>or</h2>
        </div>
        <Box width={1 / 2}>
          <Img
            className="nav-image"
            fluid={data.developmentImage.childImageSharp.fluid}
          />
        </Box>
      </Flex>
    </Header>
  )
}
