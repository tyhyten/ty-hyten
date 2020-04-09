import React from "react"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { Box, Flex } from "rebass"
import "../styles/index.scss"

// TODO - combine hoverable boxes into own components

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

  const handleDevelopmentClick = () => navigate("/experience/")

  const handlePhotographyClick = () => navigate("/gallery/")

  // TODO - make the boxes into shared components since they're identical
  return (
    <Layout>
      <Flex flexWrap="wrap" pt={[3, "5%"]} id="index">
        <Box
          width={[1, 1 / 2]}
          pb={4}
          onClick={handlePhotographyClick}
          className="hoverable-box"
        >
          <div className="content-wrapper">
            <h1 className="large-nav-label">photography</h1>
            <Img
              className="nav-image"
              fluid={data.photographyImage.childImageSharp.fluid}
            />
          </div>
        </Box>
        <Box
          width={[1, 1 / 2]}
          onClick={handleDevelopmentClick}
          className="hoverable-box"
        >
          <div className="content-wrapper">
            <h1 className="large-nav-label">development</h1>
            <Img
              className="nav-image"
              fluid={data.developmentImage.childImageSharp.fluid}
            />
          </div>
        </Box>
      </Flex>
    </Layout>
  )
}
