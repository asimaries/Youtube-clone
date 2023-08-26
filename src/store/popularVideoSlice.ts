import { createSlice } from "@reduxjs/toolkit";

const initialState: { videos: Video[], channelThumbnail: string[] } = { videos: [], channelThumbnail: [] }

const popularVideoSlice = createSlice({
  name: 'popularVideo', initialState,
  reducers: {
    addVideos: (state, action: { payload: Video[] }) => {
      state.videos.push(...action.payload)// = [...state, ...action.payload]
    }
  }
})
export const { addVideos } = popularVideoSlice.actions
export default popularVideoSlice.reducer