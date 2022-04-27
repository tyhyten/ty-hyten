import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import { Box, Flex } from "rebass"
import "../styles/index.scss"

// TODO - combine hoverable boxes into own components

const Homepage = () => {
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
            <StaticImage
              src="../data/assets/photography-image.jpg"
              className="nav-image"
              width={400}
              layout="constrained"
              quality={80}
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
            <StaticImage
              src="../data/assets/development-image.jpg"
              className="nav-image"
              width={400}
              layout="constrained"
              quality={80}
            />
          </div>
        </Box>
      </Flex>
    </Layout>
  )
}

export default Homepage
