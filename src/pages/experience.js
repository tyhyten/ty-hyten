import React from "react"
import Layout from "../components/Layout"
import "../styles/experience.scss"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import experienceJSON from "../data/content/experience.json"
import { Box, Card, Flex } from "rebass"

// TODO - perhaps have cards scroll up over whole header image
// TODO - include social media links up top

const Experience = ({ data }) => {
  // TODO - can I move this outside of component
  useStaticQuery(graphql`
    query {
      headShot: file(relativePath: { eq: "assets/ty-hyten-square.jpg" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      headerImage: file(relativePath: { eq: "images/1-TYH_8865.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(png)/" }
          relativeDirectory: { eq: "logos" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  const logos = data.allFile.edges.reduce((acc, { node }) => {
    return {
      ...acc,
      [node.name]: {
        ...node.childImageSharp.fixed,
      },
    }
  }, {})

  return (
    <Layout>
      <div>
        <div className="background-container">
          <Img
            fluid={data.headerImage.childImageSharp.fluid}
            className="header-image"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Img
            fixed={data.headShot.childImageSharp.fixed}
            style={{ borderRadius: "50%", position: "absolute", top: "126px" }}
          />
        </div>
        <Box mt={[4, 3]} className="experience-container">
          {experienceJSON.map(job => (
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
                    <Img fixed={logos[job.slug]} />
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
          ))}
        </Box>
      </div>
    </Layout>
  )
}

export default Experience
