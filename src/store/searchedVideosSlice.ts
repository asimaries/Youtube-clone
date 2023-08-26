import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  [key: string]: { videosList: VideoInfo[] },

} = {}


const searchedVideoSlice = createSlice({
  name: 'searchedVideo', initialState,
  reducers: {
    addVideos: (state, action: {
      payload: { key: string, videosList: VideoInfo[] }
    }) => {
      const { key, videosList } = action.payload;
      // console.log(key, videosList)

      if (state[key] == undefined)
        state[key] = { videosList: [] }

      state[key].videosList = [
        ...state[key].videosList,
        ...videosList
      ]
    }
  }
})
export const { addVideos } = searchedVideoSlice.actions
export default searchedVideoSlice.reducer