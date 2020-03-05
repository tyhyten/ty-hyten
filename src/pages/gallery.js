import React from "react"
import Header from "../components/Header"
import PhotoGallery from "../components/PhotoGallery"
import { useStaticQuery, graphql } from "gatsby"

const Gallery = ({ data }) => {
  useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)/" }
          relativeDirectory: { eq: "images" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fluid {
                aspectRatio
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Header>
      <PhotoGallery
        images={data.allFile.edges
          // .sort(() => 0.5 - Math.random()) // TODO - find a way to make random work with gallery
          .map(({ node }) => ({
            ...node.childImageSharp.fluid,
          }))}
        itemsPerRow={[1, 3]}
      />
    </Header>
  )
}

export default Gallery
