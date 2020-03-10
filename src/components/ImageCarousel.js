import React from "react"
import Img from "gatsby-image"
import { Box } from "rebass"

const ImageCarousel = ({ images, isOpen, currentImage }) => {
  if (isOpen) {
    return (
      <div
        style={{
          zIndex: 400,
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Img
          fluid={images[currentImage]}
          load="lazy"
          imgStyle={{ objectFit: "contain" }}
          style={{
            height: "85vh",
            width: "85vh",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    )
  }
  return null
}

export default ImageCarousel
