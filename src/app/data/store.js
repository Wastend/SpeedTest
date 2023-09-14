import { configureStore } from '@reduxjs/toolkit'
import { textApi } from '../configs/ReceiveData'
import dataReducer from './dataReducer'
import settingsReducer from './settingsReducer'

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
    data: dataReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(textApi.middleware)
})