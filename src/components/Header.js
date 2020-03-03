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
      <Img fixed={data.file.childImageSharp.fixed} />
      <Link to="/">Home</Link>
      <Link to="/gallery">Photos</Link>
      <Link to="/experience">Experience</Link>
      <div>{props.children}</div>
    </>
  )
}

export default Header
