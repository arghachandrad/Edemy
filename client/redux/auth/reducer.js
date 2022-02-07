import { createReducer } from "@reduxjs/toolkit"
import { register } from "./actions"
import { toast } from "react-toastify"

const initialState = {
  user: null,
  pending: false,
  error: false,
}

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.pending = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.pending = false
      toast.success(action.payload.message)
    })
    .addCase(register.rejected, (state, action) => {
      toast.error(action.payload.message)
      state.pending = false
      state.error = true
    })
})

export default authReducer
