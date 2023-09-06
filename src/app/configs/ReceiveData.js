import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const textApi = createApi({
  reducerPath: 'textApi', //как отображается в store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fish-text.ru/get?' }),
  endpoints: (build) => ({
    getText: build.query({
      query: (number = '') => `&type=sentence&number=${number ? number : 1}`
    }),
  })
})

export const { useGetTextQuery } = textApi