import { createSelector } from "@reduxjs/toolkit"

export const selectCount = (state) => state.counter.value

export const countSelector = createSelector(selectCount, (state) => state)
