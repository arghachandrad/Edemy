import { createAsyncThunk } from "@reduxjs/toolkit"
import { CallWithOutAuth } from "../../utils/apiActions"

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await CallWithOutAuth("POST", "/register", formData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
