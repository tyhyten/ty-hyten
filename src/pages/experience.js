import React from "react"
import Header from "../components/Header"
import "../styles/experience.scss"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const Experience = ({ data }) => {
  useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "assets/ty-hyten-square.jpg" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Header>
      <div>
        <div className="background-container" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Img
            fixed={data.file.childImageSharp.fixed}
            style={{ borderRadius: "50%", position: "absolute", top: "250px" }}
          />
        </div>
      </div>
    </Header>
  )
}

export default Experience
