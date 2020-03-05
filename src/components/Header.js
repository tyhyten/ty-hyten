import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "../styles/header.scss"

// TODO - rename to layout
const Header = ({ children }) => {
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

  if (typeof window !== `undefined`) {
    let previousScrollPosition = window.pageYOffset

    window.onscroll = () => {
      const scrollPosition = window.pageYOffset

      if (previousScrollPosition > scrollPosition) {
        document.getElementById("navbar").style.top = "0"
      } else {
        document.getElementById("navbar").style.top = "-80px"
      }
      previousScrollPosition = scrollPosition
    }
  }

  const getLinkStyle = path => ({
    ...(window.location.pathname === path && { color: "#802bb1" }),
  })

  return (
    <div className="layout">
      <div id="navbar">
        {/* TODO - get rid of blur */}
        <Link to="/">
          <Img fixed={data.file.childImageSharp.fixed} loading="lazy" />
        </Link>
        <div
          style={{
            width: "300px",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Link to="/gallery" style={getLinkStyle("/gallery")}>
            photography
          </Link>
          <Link to="/experience" style={getLinkStyle("/experience")}>
            development
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

// TODO - add propTypes to all components

export default Header
