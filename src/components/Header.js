import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import "../styles/global.css"
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

  let previousScrollPosition = window.pageYOffset

  window.onscroll = () => {
    const scrollPosition = window.pageYOffset

    if (previousScrollPosition > scrollPosition) {
      document.getElementById("navbar").style.top = "0"
    } else {
      document.getElementById("navbar").style.top = "-65px"
    }
    previousScrollPosition = scrollPosition
  }

  return (
    <div style={{ margin: "4px" }}>
      <div
        id="navbar"
        style={{
          marginBottom: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "-webkit-sticky" /* Safari */,
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          boxShadow: "0 4px 4px -4px rgba(0, 0, 0, .25)",
          zIndex: 1,
          padding: "4px",
          transition: "top 0.3s",
        }}
      >
        {/* TODO - get rid of blur */}
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
      {children}
    </div>
  )
}

// TODO - add propTypes to all components

export default Header
