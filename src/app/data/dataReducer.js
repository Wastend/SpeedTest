import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    start: false
}

const dataSlice = createSlice ({
    name: 'data',
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload
        }
    }
})

export const {setStart} = dataSlice.actions

export default dataSlice.reducer