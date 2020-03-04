import React from "react"
import Header from "../components/Header"
import "../styles/experience.scss"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import experienceJSON from "../data/content/experience.json"
import { Box, Card, Flex } from "rebass"

const Experience = ({ data }) => {
  // TODO - can I move this outside of component
  useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "assets/ty-hyten-square.jpg" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
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
    <Header>
      <div>
        <div className="background-container" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Img
            fixed={data.file.childImageSharp.fixed}
            style={{ borderRadius: "50%", position: "absolute", top: "105px" }}
          />
        </div>
        <div className="experience-container" style={{ marginTop: "90px" }}>
          {experienceJSON.map(job => (
            <Box
              key={job.slug}
              sx={{
                maxWidth: 900,
                mx: "auto",
                px: 3,
              }}
            >
              <Card
                sx={{
                  p: 4,
                  m: 4,
                  boxShadow: "0 0 4px rgba(0, 0, 0, .25)",
                  borderRadius: 15,
                }}
              >
                <Flex>
                  {/* TODO - these inline styles can probably go into box's sx prop */}
                  <Box
                    width={1 / 4}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Img fixed={logos[job.slug]} />
                  </Box>
                  <Box width={3 / 4}>
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
        </div>
      </div>
    </Header>
  )
}

export default Experience
