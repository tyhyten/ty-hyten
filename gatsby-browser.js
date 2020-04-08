import React from "react"
import "./src/styles/global.css"
import "typeface-didact-gothic"
import "typeface-lexend-deca"
import AppProvider from "./src/providers/AppProvider"

export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
)
