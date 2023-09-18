import React, { useState, useEffect } from 'react'
import { useGetTextQuery } from '../../app/configs/ReceiveData'
import './MainPage.scss'
import MainSettings from './MainSettings'
import MainForm from './MainForm'
import { useDispatch, useSelector } from 'react-redux'
import { setStart, setText, setCountCurrentElement } from '../../app/data/dataReducer'

const MainPage = () => {
  const dispatch = useDispatch()
  const settings = useSelector(state => state.settings) //Настройки
  const [countForApi, setCountForApi] = useState(10) //Количество предложений для получения с сервера
  const { data = {}, refetch } = useGetTextQuery(countForApi) //данные с апи

  async function sendRequest() { //Отправить запрос на API
    dispatch(setStart(false))
    dispatch(setCountCurrentElement(0))
    if (settings.selectedSetting === 1) {
      await setCountForApi(6)
      refetch()
    }
    else if (settings.selectedSetting === 2 && settings.countWords > 0) {
      await setCountForApi(100)
      refetch()
    }
    else if (settings.selectedSetting === 3 && settings.countSentences > 0) {
      await setCountForApi(settings.countSentences)
      refetch()
    }
  }

  useEffect(() => { //Подкорректировать текст при получении с API
    if (data !== '' && Object.keys(data).length !== 0) {
      if (settings.selectedSetting === 1 || settings.selectedSetting === 3) {
        dispatch(setText(data))
      }
      else {
        const sentences = data.split(' ').slice(0, settings.countWords)
        dispatch(setText(sentences.join(' ')))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <section className='MainPage'>
      <MainSettings sendRequest={sendRequest} />
      <MainForm />
    </section >
  )
}

export default MainPage