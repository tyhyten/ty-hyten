import React from "react"
import { Link, useStaticQuery } from "gatsby"

const Header = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <h1>{data.site.siteMetadata.title}</h1>
      <Link to="/">Home</Link>
      <Link to="/gallery">Photos</Link>
      <Link to="/experience">Experience</Link>
      <div style={{ margin: "5px" }}>{props.children}</div>
    </>
  )
}

export default Header
