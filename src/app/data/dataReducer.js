import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  start: false,
  text: '',
  countCurrentElement: 0,
  countMistakes: 0
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
    setCountCurrentElement: (state, action) => {
      state.countCurrentElement = action.payload
    },
    setCountMistakes: (state, action) => {
      state.countMistakes = action.payload
    },
  }
})

export const { setStart, setText, setCountCurrentElement, setCountMistakes } = dataSlice.actions

export default dataSlice.reducer