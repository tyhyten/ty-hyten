import React from "react"
import Img from "gatsby-image"

// TODO - add ability to swipe through the images
// TODO - fine tune click out behavior
// TODO - darken background and lock scrolling when carousel is open
// TODO - use separate widths on mobile

const ImageCarousel = ({ onClose, images, isOpen, currentImage }) => {
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
        <h4
          style={{
            left: "400px",
            zIndex: 400,
            position: "relative",
            bottom: "266px",
            color: "white",
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </h4>
        <Img
          fluid={images[currentImage]}
          load="lazy"
          imgStyle={{ objectFit: "contain" }}
          style={{
            height: "85vh",
            width: "85vw",
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
