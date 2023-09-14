import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    start: false,
    text: ''
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
    }
})

export const { setStart, setText } = dataSlice.actions

export default dataSlice.reducer