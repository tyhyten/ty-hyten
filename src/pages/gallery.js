import React, { useState } from "react"
import Layout from "../components/Layout"
import PhotoGallery from "../components/PhotoGallery"
import { useStaticQuery, graphql } from "gatsby"
import ImageCarousel from "../components/ImageCarousel"

export const query = graphql`
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
            fluid(maxWidth: 1000, quality: 100) {
              aspectRatio
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const getRandomizedImages = images =>
  images
    .sort(() => 0.5 - Math.random())
    .map(({ node }) => ({
      ...node.childImageSharp.fluid,
    }))

const Gallery = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [images, setImages] = useState(getRandomizedImages(data.allFile.edges)) // TODO - useEffect instead on this?

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleImageClick = imageIndex => {
    console.log("image", imageIndex)
    toggleModal()
    setImageIndex(imageIndex)
  }

  return (
    <>
      <Layout>
        <PhotoGallery
          images={images}
          itemsPerRow={[1, 3]}
          onImageClick={handleImageClick}
        />
      </Layout>
      <ImageCarousel
        images={images}
        isOpen={isModalOpen}
        currentImage={imageIndex}
      />
    </>
  )
}

export default Gallery
