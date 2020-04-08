import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import PhotoGallery from "../components/PhotoGallery"
import { graphql } from "gatsby"
import ImageCarousel from "../components/ImageCarousel"
import { AppContext } from "../providers/AppProvider"

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
            fluid(maxWidth: 1000, quality: 70) {
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
  const { setIsNavOpen } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getRandomizedImages(data.allFile.edges))
  }, [data.allFile.edges])

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleImageClick = imageIndex => {
    setIsNavOpen(false)
    toggleModal()
    setImageIndex(imageIndex)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setIsNavOpen(true)
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
        onClose={handleModalClose}
        images={images}
        isOpen={isModalOpen}
        currentImage={imageIndex}
      />
    </>
  )
}

export default Gallery
