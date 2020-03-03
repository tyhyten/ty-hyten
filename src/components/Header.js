import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

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
  `)

  return (
    <>
      <div style={{ marginBottom: "8px" }}>
        <Img fixed={data.file.childImageSharp.fixed} />
        <Link to="/gallery">Photo</Link>
        <Link to="/experience">Development</Link>
      </div>
      {props.children}
    </>
  )
}

export default Header
