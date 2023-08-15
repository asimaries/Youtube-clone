import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store