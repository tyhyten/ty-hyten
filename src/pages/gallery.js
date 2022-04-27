import React, { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import PhotoGallery from "../components/PhotoGallery"
import { graphql } from "gatsby"
import ImageCarousel from "../components/ImageCarousel"
import { AppContext } from "../providers/AppProvider"

const isWindowPresent = typeof window !== `undefined`

export const query = graphql`
  {
    allFile(
      filter: {
        extension: { regex: "/(jpg)/" }
        relativeDirectory: { eq: "images" }
      }
    ) {
      edges {
        node {
          name
          ext
          childImageSharp {
            gatsbyImageData(
              quality: 70
              placeholder: BLURRED
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
  }
`

const getRandomizedImages = images =>
  images
    .sort(() => 0.5 - Math.random())
    .map(({ node, node: { name, ext } }) => ({
      ext,
      name,
      imageData: {
        ...node.childImageSharp.gatsbyImageData,
      },
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
    // TODO - create a hook that watches window size and provides if we're mobile
    if (isWindowPresent && window.innerWidth <= 375) {
      return
    }

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
