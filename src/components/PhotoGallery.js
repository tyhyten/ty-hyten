import Img from "gatsby-image"
import { chunk, sum } from "lodash" // TODO - remove lodash
import React, { useState } from "react"
import { Box } from "rebass"
import Carousel, { Modal, ModalGateway } from "react-images"
import { useStaticQuery, graphql } from "gatsby"

const PhotoGallery = ({ images, itemsPerRow: itemsPerRowByBreakpoints }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const handleImageClick = imageIndex => {
    toggleModal()
    setImageIndex(imageIndex)
  }

  const aspectRatios = images.map(image => image.aspectRatio) // TODO - replace this with a reduce

  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )
  // TODO - perhaps do this with CSS grid auto-fill/auto-fit to simplify, and remove rebass
  // TODO - add SEO stuff

  const ImageModal = ({ images, photoIndex }) => {
    const fullQualityImages = useStaticQuery(graphql`
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
                fixed(quality: 100, width: 1000) {
                  aspectRatio
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `)

    // TODO - need to get a carousel that uses Img component to lead images as you click through, rather than all at once

    const fullies = fullQualityImages.allFile.edges.map(({ node }) => ({
      ...node.childImageSharp.fixed,
    }))

    return (
      <ModalGateway>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <Carousel views={fullies} currentIndex={imageIndex} />
          </Modal>
        )}
      </ModalGateway>
    )
  }

  return (
    <div>
      {images.map((image, i) => (
        <Box
          key={image.src}
          width={rowAspectRatioSumsByBreakpoints.map(
            (rowAspectRatioSums, j) => {
              const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j])
              const rowAspectRatioSum = rowAspectRatioSums[rowIndex]

              return `${(image.aspectRatio / rowAspectRatioSum) * 100}%`
            }
          )}
          css={{ display: "inline-block" }}
          onClick={() => handleImageClick(i)}
          style={{ cursor: "pointer" }}
        >
          <Img fluid={image} loading="lazy" imgStyle={{ padding: "0px 4px" }} />
        </Box>
      ))}
      <ImageModal images={images} photoIndex={imageIndex} />
    </div>
  )
}

export default PhotoGallery
