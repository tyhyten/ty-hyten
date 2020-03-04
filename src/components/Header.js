import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "../styles/global.css"
// TODO - rename to layout
const Header = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { eq: "assets/tyhytenlogo.png" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `) // TODO - see if can grab this off of props instead of variable

  return (
    <div style={{ margin: "4px" }}>
      <div
        style={{
          marginBottom: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Img fixed={data.file.childImageSharp.fixed} loading="lazy" />
        <div
          style={{
            width: "300px",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Link to="/gallery">photo</Link>
          <Link to="/experience">development</Link>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Header
