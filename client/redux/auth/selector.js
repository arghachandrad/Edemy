import { createSelector } from "@reduxjs/toolkit"

export const selectAuth = (state) => state.auth

export const authSelector = createSelector(selectAuth, (state) => state)
