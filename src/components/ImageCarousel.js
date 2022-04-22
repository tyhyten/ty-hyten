import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import "../styles/image-carousel.scss"

// TODO - add ability to swipe through the images
// TODO - add ability to click through the images
// TODO - lock scrolling when carousel is open
// TODO - use separate widths on mobile
// TODO - fix click out behavior

const carouselImageStyle = {
  height: "85vh",
  width: "85vw",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}

const ImageCarousel = ({ onClose, images, isOpen, currentImage }) => {
  // const isPortrait = images[currentImage].aspectRatio < 1 // TODO - abstract this to a custom hook
  // TODO - clean up classNames
  // TODO - disable scroll while this is open

  if (isOpen) {
    return (
      <div id="image-carousel">
        <div className="modal-background" onClick={onClose} />
        <div className="close-icon-wrapper">
          <div className="close-x-wrapper">
            <h4 className="close-x" onClick={onClose}>
              &times;
            </h4>
          </div>
          <GatsbyImage
            image={images[currentImage].imageData}
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
