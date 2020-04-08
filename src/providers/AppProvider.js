import React, { createContext, useState } from "react"

export const AppContext = createContext({ isNavOpen: true })

export const AppProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true)
  const defaultState = { isNavOpen, setIsNavOpen }

  return (
    <AppContext.Provider value={defaultState}>{children}</AppContext.Provider>
  )
}

export default AppProvider
