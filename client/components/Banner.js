import React from "react"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"

const Banner = ({ text }) => {
  return (
    <Box
      height="30vh"
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 2,
        background: "linear-gradient(to right, #26a69a, #2979ff)",
      }}
    >
      <Typography variant="h4" color="#fff">
        {text}
      </Typography>
    </Box>
  )
}

export default Banner
