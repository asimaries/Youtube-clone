import { createSlice } from "@reduxjs/toolkit";

// interface SearchInitialState {

// }

const searchSlice = createSlice({
  name: 'search', initialState: {} as any,
  reducers: {
    cacheResults: (state, action) => {
      // { 'ip' : ['iphone', 'iphone 14']}
      state = Object.assign(state, action.payload)
    }
  }
})

export const { cacheResults } = searchSlice.actions
export default searchSlice.reducer