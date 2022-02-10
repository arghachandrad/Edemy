import axios from "axios"
// import { useDispatch } from "react-redux"
import { logout } from "../redux/auth/actions"

axios.interceptors.response.use(
  function (response) {
    // any status code that lie within 2xx
    return response
  },
  function (error) {
    // const dispatch = useDispatch()
    // any status code that falls outside the range of 2xx
    const res = error.response
    if (res.status === 401) {
      if (typeof window === "undefined") {
        // throw new CustomError() //Throw custom error here
        console.log("Window not defined")
      } else {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default axios
