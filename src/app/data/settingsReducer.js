import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  countWords: 30,
  countSentences: 4,
  selectedSetting: 1,
  countForApi: 10,
  error: ''
}

function regular(state, inputValue, setting, min, max) {
  const isValid = /^\d+$/.test(inputValue)
  const number = isValid ? parseInt(inputValue, 10) : inputValue
  state.selectedSetting = setting
  if (setting === 2)
    state.countWords = number
  else
    state.countSentences = number
  isValid && number >= min && number <= max ? state.error = '' : state.error = `Пожалуйста, введите целое число от ${min + ' до ' + max}`
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCountWords: (state, action) => {
      regular(state, action.payload, 2, 1, 999)
    },
    setCountSentences: (state, action) => {
      regular(state, action.payload, 3, 1, 99)
    },
    setSelectedSetting: (state, action) => {
      if (action.payload === 2) {
        regular(state, state.countWords, 2, 1, 999)
      }
      else if (action.payload === 3) {
        regular(state, state.countSentences, 3, 1, 99)
      }
      else
        state.selectedSetting = action.payload
    }
  }
})

export const { setCountWords, setCountSentences, setSelectedSetting } = settingsSlice.actions

export default settingsSlice.reducer