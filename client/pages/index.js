import { Button } from "@mui/material"
import Container from "@mui/material/Container"
import Banner from "../components/Banner"

const Homepage = () => {
  return (
    <>
      <Banner text="Largest Online Education Marketplace" />
      <Container maxWidth="sm">
        <h1>Home Page</h1>
        <p>lorem*15</p>
      </Container>
    </>
  )
}

export default Homepage
