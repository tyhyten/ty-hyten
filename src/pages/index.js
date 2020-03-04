import React from "react"
import Header from "../components/Header"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Flex } from "rebass"
import "../styles/index.scss"

export default ({ data }) => {
  useStaticQuery(graphql`
    query {
      photographyImage: file(
        relativePath: { eq: "assets/photography-image.jpg" }
      ) {
        childImageSharp {
          fluid(quality: 80, maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      developmentImage: file(
        relativePath: { eq: "assets/development-image.jpg" }
      ) {
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
          <div style={{ textAlign: "center", position: "relative" }}>
            <h1
              style={{
                color: "white",
                zIndex: "3",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3vw",
              }}
            >
              photography
            </h1>
            <Img
              className="nav-image"
              fluid={data.photographyImage.childImageSharp.fluid}
            />
          </div>
        </Box>
        <div style={{ margin: "auto" }}>
          <h3>or</h3>
        </div>
        <Box width={1 / 2}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <h1
              style={{
                color: "white",
                zIndex: "1",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "2em",
              }}
            >
              development
            </h1>
            <Img
              className="nav-image"
              fluid={data.developmentImage.childImageSharp.fluid}
            />
          </div>
        </Box>
      </Flex>
    </Header>
  )
}
