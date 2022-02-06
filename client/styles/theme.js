import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { teal, grey } from "@mui/material/colors"

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
      dark: teal[800],
    },
    secondary: {
      main: grey[100],
      dark: grey[600],
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
})

theme = responsiveFontSizes(theme)

export default theme
