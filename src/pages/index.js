import React from "react"
import Header from "../components/Header"
import Img from "gatsby-image"
import { graphql, navigate, useStaticQuery } from "gatsby"
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

  const handleDevelopmentClick = () => navigate("/gallery")

  const handlePhotographyClick = () => navigate("/experience")

  return (
    <Header>
      <Flex flexWrap="wrap" mt={4}>
        <Box width={[1, 1 / 2]} pb={4} onClick={handlePhotographyClick} style={{ cursor: "pointer" }}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <h1
              style={{
                pointerEvents: "none",
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
        <Box width={[1, 1 / 2]} onClick={handleDevelopmentClick} style={{ cursor: "pointer" }}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <h1
              style={{
                pointerEvents: "none",
                color: "white",
                zIndex: "1",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3vw", // make this and other things a class in here to DRY this up
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
