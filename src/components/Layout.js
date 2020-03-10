import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "../styles/layout.scss"

const isWindowPresent = typeof window !== `undefined`

const Layout = ({ children }) => {
  const logo = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { eq: "assets/ty-hyten-logo.png" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  if (isWindowPresent) {
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
    ...(isWindowPresent &&
      window.location.pathname === path && { color: "#802bb1" }),
  })

  return (
    <div className="layout">
      <div id="navbar">
        <Link to="/">
          <Img
            fadeIn={false}
            fixed={logo.file.childImageSharp.fixed}
            loading="eager"
          />
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
      {/* <div style={{ height: "200px" }}>I'm the footer</div> */}
    </div>
  )
}

// TODO - add propTypes to all components

export default Layout
