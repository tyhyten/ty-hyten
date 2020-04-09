import React, { useEffect, useContext } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import twitterSVG from "../data/assets/twitter-logo.svg"
import "../styles/layout.scss"
import { AppContext } from "../providers/AppProvider"

const imageStyle = { marginRight: "4px" }

const isWindowPresent = typeof window !== `undefined` // TODO - make a hook or put on context

// TODO - DRY up query

// TODO - fix bug where scrolling blows up

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

  const { isNavOpen } = useContext(AppContext)

  useEffect(() => {
    if (isWindowPresent) {
      let previousScrollPosition = window.pageYOffset

      window.onscroll = () => {
        if (isNavOpen) {
          const scrollPosition = window.pageYOffset

          if (previousScrollPosition > scrollPosition) {
            document.getElementById("navbar").style.top = "0"
          } else {
            document.getElementById("navbar").style.top = "-80px"
          }
          previousScrollPosition = scrollPosition
        }
      }
    }
  }, [isNavOpen])

  const getLinkStyle = path => ({
    ...(isWindowPresent &&
      window.location.pathname === path && { color: "#802bb1" }),
  })

  return (
    <div id="layout">
      {isNavOpen && (
        <div id="navbar">
          <Link to="/">
            <Img
              fadeIn={false}
              fixed={logos.tyhyten.childImageSharp.fixed}
              loading="eager"
            />
          </Link>
          <div className="navigation-links">
            <Link to="/gallery/" style={getLinkStyle("/gallery/")}>
              photography
            </Link>
            <Link to="/experience/" style={getLinkStyle("/experience/")}>
              development
            </Link>
          </div>
        </div>
      )}
      {children}
      <div className="footer">
        <div className="social-icons">
          <a
            href="https://www.instagram.com/tyhyten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Img
              fadeIn={false}
              fixed={logos.instagram.childImageSharp.fixed}
              loading="eager"
              style={imageStyle}
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
              style={imageStyle}
            />
          </a>
          <a
            href="https://www.twitter.com/tyhyten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="twitter-icon">
              <img src={twitterSVG} alt="twitter-logo" />
            </div>
          </a>
        </div>
        <p className="copyright">© 2020 Ty Hyten</p>
      </div>
    </div>
  )
}

export default Layout
