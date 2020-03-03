import Typography from "typography"
import moragaTheme from "typography-theme-moraga"

moragaTheme.overrideThemeStyles = () => ({
  a: {
    color: "black",
    textTransform: "uppercase",
  },
  "a:hover": {
    textDecoration: "none",
  },
})

const typography = new Typography(moragaTheme)

export const { scale, rhythm, options } = typography

export default typography
