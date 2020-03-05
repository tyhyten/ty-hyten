import Img from "gatsby-image"
import { chunk, sum } from "lodash" // TODO - remove lodash
import React, { useState } from "react"
import { Box } from "rebass"
import Carousel, { Modal, ModalGateway } from "react-images"

const PhotoGallery = ({ images, itemsPerRow: itemsPerRowByBreakpoints }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const aspectRatios = images.map(image => image.aspectRatio) // TODO - replace this with a reduce

  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )
  // TODO - perhaps do this with CSS grid auto-fill/auto-fit to simplify, and remove rebass

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
        >
          <Img fluid={image} loading="lazy" imgStyle={{ padding: "0px 4px" }} />
        </Box>
      ))}
      <ModalGateway>
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <Carousel views={images} />
          </Modal>
        )}
      </ModalGateway>
    </div>
  )
}

export default PhotoGallery
