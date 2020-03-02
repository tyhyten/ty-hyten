import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => (
  <>
    <Link to="/">Home</Link>
    <Link to="/gallery">Photos</Link>
    <Link to="/experience">Experience</Link>
    <div style={{ margin: "45px" }}>{children}</div>
  </>
)

export default Layout
