import React from "react"
import Layout from "../components/Layout"
import "../styles/experience.scss"
import { graphql, useStaticQuery } from "gatsby"
import experienceJSON from "../data/content/experience.json"
import { Box, Card, Flex } from "rebass"
import { StaticImage, getImage, GatsbyImage } from "gatsby-plugin-image"

const headShotImageStyle = {
  borderRadius: "50%",
  position: "absolute",
  top: "126px",
}

const Experience = () => {
  // TODO - move this outside of component ?
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(png|jpeg)/" }
          relativeDirectory: { eq: "companyLogos" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 100, layout: FIXED)
            }
          }
        }
      }
    }
  `)

  const companyLogos = data.allFile.edges.reduce((acc, { node }) => {
    return {
      ...acc,
      [node.name]: {
        ...node.childImageSharp.gatsbyImageData,
      },
    }
  }, {})
  console.log("companyLogos is ", companyLogos)
  return (
    <Layout>
      <div id="experience">
        <div className="background-container">
          <StaticImage
            src="../data/images/1-TYH_8865.jpg"
            alt="red rocks amphitheater"
            placeholder="blurred"
            layout="fullWidth"
            className="header-image"
          />
        </div>
        <div className="headshot-container">
          <StaticImage
            src="../data/assets/ty-hyten-square.jpg"
            layout="fixed"
            width={200}
            placeholder="blurred"
            style={headShotImageStyle}
            alt="ty hyten headshot"
          />
        </div>
        <Box mt={[4, 3]} className="experience-container">
          {experienceJSON.map(job => {
            const jobImage = getImage(companyLogos[job.slug])

            return (
              <Box
                key={job.slug}
                sx={{
                  maxWidth: 900,
                  mx: "auto",
                  px: [1, 3],
                }}
              >
                <Card
                  sx={{
                    p: [3, 4],
                    mx: [0, 4],
                    mb: [3, 4],
                    boxShadow: "0 0 4px rgba(0, 0, 0, .25)",
                    borderRadius: 15,
                  }}
                >
                  <Flex flexWrap="wrap">
                    <Box
                      width={[1, 1 / 5]}
                      sx={{
                        display: "flex",
                        flexDirection: ["row", "column"],
                        justifyContent: "center",
                      }}
                      my={[3, 0]}
                    >
                      <GatsbyImage
                        image={jobImage}
                        alt={`${job.company} logo`}
                        layout="fixed"
                        width={100}
                      />
                    </Box>
                    <Box
                      width={[1, 4 / 5]}
                      sx={{ textAlign: ["center", "left"] }}
                    >
                      <h2>{job.company}</h2>
                      <h3>{job.role}</h3>
                      <h4>
                        {job.time.startDate} - {job.time.endDate}
                      </h4>
                      <p>{job.description}</p>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            )
          })}
        </Box>
      </div>
    </Layout>
  )
}

export default Experience
