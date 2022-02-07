import { createAsyncThunk } from "@reduxjs/toolkit"
import { CallWithOutAuth } from "../../utils/apiActions"

export const register = createAsyncThunk("auth/register", async (formData) => {
  const response = await CallWithOutAuth("POST", "/register", formData)
  return response.data
})
