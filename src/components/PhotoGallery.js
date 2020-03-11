import Img from "gatsby-image"
import { chunk, sum } from "lodash" // TODO - remove lodash
import React, { useState } from "react"
import { Box } from "rebass"

const PhotoGallery = ({
  onImageClick,
  images,
  itemsPerRow: itemsPerRowByBreakpoints,
}) => {
  const aspectRatios = images.map(image => image.aspectRatio)

  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )

  // TODO - add hover captions and SEO

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
          onClick={() => onImageClick(i)}
          style={{ cursor: "pointer" }}
        >
          <Img fluid={image} loading="lazy" imgStyle={{ padding: "0px 4px" }} />
        </Box>
      ))}
    </div>
  )
}

export default PhotoGallery
