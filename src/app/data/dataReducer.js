import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  start: false,
  text: '',
  countCurrentElement: 0,
  countMistakes: 0,
  symbolsInMin: 0
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
    setSymbolsInMin: (state, action) => {
      state.symbolsInMin = action.payload
    },
    resetData: (state) => {
      state.countCurrentElement = 0
      state.countMistakes = 0
      state.symbolsInMin = 0
    },
  }
})

export const { setStart, setText, setCountCurrentElement, setCountMistakes, setSymbolsInMin, resetData } = dataSlice.actions

export default dataSlice.reducer