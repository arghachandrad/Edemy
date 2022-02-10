import { createReducer } from "@reduxjs/toolkit"
import { login, logout, register } from "./actions"

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
    })
    .addCase(register.rejected, (state, action) => {
      state.pending = false
      state.error = true
    })
    .addCase(login.pending, (state) => {
      state.pending = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data
      state.pending = false
    })
    .addCase(login.rejected, (state, action) => {
      state.pending = false
      state.error = true
    })
    .addCase(logout.pending, (state) => {
      state.pending = true
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = null
      state.pending = false
    })
    .addCase(logout.rejected, (state, action) => {
      state.pending = false
      state.error = true
    })
  // .addCase(logout, (state) => {
  //   state.user = null
  // })
})

export default authReducer
