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
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"
import Link from "next/link"
import { useRouter } from "next/router"

const Register = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, pending, error } = useSelector(authSelector)
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
      try {
        const response = await dispatch(
          register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        ).unwrap()
        toast.success(response.message)
        // clear fields and clear validation msg
        setFormData((prev) => ({
          ...prev,
          validation: false,
          name: "",
          email: "",
          password: "",
        }))
        router.push("/login")
      } catch (error) {
        toast.error(error.message)
        // donot clear fields but clear validation msg
        setFormData((prev) => ({ ...prev, validation: false }))
      }
    } else {
      toast.error("Please enter all the required fields")
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
                value={formData.name}
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
                value={formData.email}
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
                value={formData.password}
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
            <Grid item xs={12}>
              <LoadingButton
                loading={pending}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Register
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ display: "inline" }} variant="body2">
                Already registered ?
              </Typography>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}

export const getServerSideProps = async function ({ req, res }) {
  const { token } = req.cookies

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Register
