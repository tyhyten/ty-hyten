import React from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import twitterSVG from "../data/assets/twitter-logo.svg"
import "../styles/layout.scss"

const isWindowPresent = typeof window !== `undefined`

// TODO - DRY up query

const Layout = ({ children }) => {
  const logos = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      tyhyten: file(relativePath: { eq: "assets/ty-hyten-logo.png" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      instagram: file(relativePath: { eq: "assets/instagram-logo.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedin: file(relativePath: { eq: "assets/linkedin-logo.png" }) {
        childImageSharp {
          fixed(width: 30) {
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
            fixed={logos.tyhyten.childImageSharp.fixed}
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
      <div style={{ height: "200px", backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <a
            href="https://www.instagram.com/tyhyten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img
              fadeIn={false}
              fixed={logos.instagram.childImageSharp.fixed}
              loading="eager"
              style={{ marginRight: "4px" }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/tyhyten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img
              fadeIn={false}
              fixed={logos.linkedin.childImageSharp.fixed}
              loading="eager"
              style={{ marginRight: "4px" }}
            />
          </a>
          <a
            href="https://www.twitter.com/tyhyten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ width: "30px", display: "inline-block" }}>
              <img src={twitterSVG} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

// TODO - add propTypes to all components

export default Layout
