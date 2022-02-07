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
    .addCase(register.fulfilled, (state, { payload }) => {
      state.pending = false
      console.log("register data: ", payload)
      state.data = payload
    })
    .addCase(register.rejected, (state) => {
      state.pending = false
      state.error = true
    })
})

export default authReducer
