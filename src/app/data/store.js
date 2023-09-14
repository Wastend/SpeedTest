import { configureStore } from '@reduxjs/toolkit'
import { textApi } from '../configs/ReceiveData'
import dataReducer from './dataReducer'

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
    data: dataReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(textApi.middleware)
})