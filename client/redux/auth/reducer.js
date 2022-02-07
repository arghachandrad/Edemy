import { createReducer } from "@reduxjs/toolkit"
import { register } from "./actions"

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
      console.log("register data: ", action)
      state.data = payload
    })
    .addCase(register.rejected, (state, action) => {
      console.log("action: ", action)
      state.pending = false
      state.error = true
    })
})

export default authReducer
