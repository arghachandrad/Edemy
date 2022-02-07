import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import authReducer from "./auth/reducer"
import { counterReducer } from "./counter/reducer"
import kanyeReducer from "./kanye/reducer"

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
    counter: counterReducer,
    kenye: kanyeReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})
