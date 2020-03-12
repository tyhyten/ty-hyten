import React from "react"
import Img from "gatsby-image"
import "../styles/image-carousel.scss"

// TODO - add ability to swipe through the images
// TODO - add ability to click through the images
// TODO - lock scrolling when carousel is open
// TODO - use separate widths on mobile

const carouselImageStyle = {
  height: "85vh",
  width: "85vw",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}

const ImageCarousel = ({ onClose, images, isOpen, currentImage }) => {
  if (isOpen) {
    return (
      <div id="image-carousel">
        <div className="modal-background" onClick={onClose} />
        <div className="close-icon-wrapper">
          <h4 onClick={onClose}>&times;</h4>
          <Img
            fluid={images[currentImage]}
            load="lazy"
            imgStyle={{ objectFit: "contain" }}
            style={carouselImageStyle}
          />
        </div>
      </div>
    )
  }
  return null
}

export default ImageCarousel
