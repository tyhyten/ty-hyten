import { GatsbyImage } from "gatsby-plugin-image";
import { chunk, sum } from "lodash" // TODO - remove lodash
import React, { useRef, useState } from "react"
import { Box } from "rebass"
import imageDescriptions from "@data/image-descriptions"
import "@styles/photo-gallery.scss"
// TODO - swap out all paths with new relative paths

const PhotoGallery = ({
  onImageClick,
  images,
  itemsPerRow: itemsPerRowByBreakpoints,
}) => {
  const [hoverIndex, setHoverIndex] = useState(null)

  const aspectRatios = images.map(image => image.aspectRatio)

  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )

  const ref = useRef() // TODO - rename and make function below more readable

  const toggleMobileClick = clickedIndex => {
    if (hoverIndex === clickedIndex && ref.current === clickedIndex) {
      setHoverIndex(null)
      return
    }

    ref.current = clickedIndex

    setHoverIndex(clickedIndex)
  }

  // TODO - move inline styles out to stylesheet
  // TODO - don't call both functions inside of onClick

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
            toggleMobileClick(i)
            onImageClick(i)
          }}
          style={{
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {hoverIndex === i && (
            <h3
              className="image-title"
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
          )}
          <GatsbyImage
            image={image}
            // TODO - do this better
            className={`${hoverIndex === i ? 'image' : ''}`}
            alt={imageDescriptions[
              `${image.name}${image.ext}`
            ].title.toLowerCase()}
            loading="lazy"
            imgStyle={{ padding: "0px 4px" }} />
        </Box>
      ))}
    </div>
  );
}

export default PhotoGallery
