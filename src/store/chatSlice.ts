import { createSlice } from '@reduxjs/toolkit'

interface IinitialState {
  name: string;
  message: string;
  key: string;
}

const initialState: { messages: IinitialState[] } = { messages: [] }

const chatSlice = createSlice({
  name: 'chat', initialState,
  reducers: {
    addMessage: (state, action: { payload: IinitialState[] }) => {
      state.messages.unshift(...action.payload)
      state.messages = state.messages.slice(0, 20)
    },
    clearMessage: (state) => {
      state.messages = []
    }
  }
})

export const { addMessage, clearMessage } = chatSlice.actions
export default chatSlice.reducer
