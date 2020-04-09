import Img from "gatsby-image"
import { chunk, sum } from "lodash" // TODO - remove lodash
import React, { useState } from "react"
import { Box } from "rebass"
import imageDescriptions from "@data/image-descriptions"
import "@styles/photo-gallery.scss"
// TODO - swap out all paths with new relative paths

const PhotoGallery = ({
  onImageClick,
  images,
  itemsPerRow: itemsPerRowByBreakpoints,
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const aspectRatios = images.map(image => image.aspectRatio)

  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )
  // TODO - add ability to click on an image in mobile, lower opacity and show band name
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
          onClick={() => {
            setHoverIndex(i)
            onImageClick(i)
          }}
          style={{
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {hoverIndex === i &&
            <h3
              style={{
                textAlign: "center",
                position: "absolute",
                top: "50%",
                right: "50%",
                transform: "translate(50%, -50%)",
                zIndex: 900,
                textTransform: "uppercase",
              }}
            >
              {imageDescriptions[`${image.name}${image.ext}`].title}
            </h3>
          }
          <Img
            className="image"
            alt={imageDescriptions[
              `${image.name}${image.ext}`
            ].title.toLowerCase()}
            fluid={image}
            loading="lazy"
            imgStyle={{ padding: "0px 4px" }}
          />
        </Box>
      ))}
    </div>
  )
}

export default PhotoGallery
