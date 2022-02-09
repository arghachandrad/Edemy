import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import authReducer from "./auth/reducer"

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})
