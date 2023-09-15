import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const textApi = createApi({
  reducerPath: 'textApi', //как отображается в store
  tagTypes: ['Sentence'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fish-text.ru/get?' }),
  endpoints: (build) => ({
    getText: build.query({
      query: (number = '') => `&type=sentence&number=${number ? number : 1}`,
      providesTags: () => [{
        type: 'Sentence',
      }],
      transformResponse: (response) => {
        return response.text
      }
    }),
  })
})

export const { useGetTextQuery } = textApi