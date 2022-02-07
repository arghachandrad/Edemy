import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useState } from "react"
import validationUtility from "../utils/validationUtility"
import Banner from "../components/Banner"
import { useDispatch, useSelector } from "react-redux"
import { authSelector } from "../redux/auth/selector"
import { register } from "../redux/auth/actions"

const Register = () => {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    validation: false,
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formValidation = () => {
    if (
      validationUtility.text(formData.name) &&
      validationUtility.email(formData.email) &&
      validationUtility.text(formData.password)
    ) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormData((prev) => ({ ...prev, validation: true }))
    const validationResponse = await formValidation()
    if (validationResponse) {
      dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      )
      console.log(formData)
    } else {
      console.log("error")
    }
  }

  return (
    <>
      <Banner text="Register" />
      <Paper sx={{ p: 2, maxWidth: 800, mx: "auto", mt: 5 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                variant="outlined"
                name="name"
                onChange={handleChange}
                placeholder="Enter name"
                fullWidth
                error={
                  formData.validation
                    ? !validationUtility.text(formData.name)
                    : false
                }
                helperText={
                  formData.validation && !validationUtility.text(formData.name)
                    ? "Please enter a valid name"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                fullWidth
                error={
                  formData.validation
                    ? !validationUtility.email(formData.email)
                    : false
                }
                helperText={
                  formData.validation &&
                  !validationUtility.email(formData.email)
                    ? "Please enter a valid email"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                fullWidth
                error={
                  formData.validation
                    ? !validationUtility.text(formData.password)
                    : false
                }
                helperText={
                  formData.validation &&
                  !validationUtility.text(formData.password)
                    ? "Please enter a valid password"
                    : ""
                }
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" size="large">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}

export default Register
