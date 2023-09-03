import { configureStore } from '@reduxjs/toolkit'
import { textApi } from '../configs/ReceiveData'

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(textApi.middleware)
})