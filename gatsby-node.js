var fs = require("fs")
var imageDescriptions = require("./src/data/image-descriptions")

const GALLERY_IMAGES_PATH = "./src/data/images/"

const addNewImageDescriptions = () => {
  const newImageDescriptions = fs
    .readdirSync(GALLERY_IMAGES_PATH)
    .reduce((acc, fileName) => {
      if (!imageDescriptions[fileName]) {
        return {
          ...acc,
          [fileName]: {
            title: "",
            description: "",
          },
        }
      }
      return acc
    }, {})

  const updatedImageDescriptions = {
    ...imageDescriptions,
    ...newImageDescriptions,
  }

  fs.writeFileSync(
    "./src/data/image-descriptions.json",
    JSON.stringify(updatedImageDescriptions),
    "utf-8"
  )
}

addNewImageDescriptions()
