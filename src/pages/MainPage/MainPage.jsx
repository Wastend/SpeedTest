import React, { useState, useEffect } from 'react'
import { useGetTextQuery } from '../../app/configs/ReceiveData'
import './MainPage.scss'
import MainSettings from './MainSettings'
import MainForm from './MainForm'
import { useDispatch, useSelector } from 'react-redux'
import { setStart, setText } from '../../app/data/dataReducer'

const MainPage = () => {
  const dispatch = useDispatch()
  const countWords = useSelector(state => state.settings.countWords) //Необходимое количество слов
  const countSentences = useSelector(state => state.settings.countSentences) //Необходимое количество предложений
  const selectedSetting = useSelector(state => state.settings.selectedSetting) //Выбранная настройка

  const [countCurrentElement, setCountCurrentElement] = useState(0)
  const [countForApi, setCountForApi] = useState(10) //Количество предложений для получения с сервера

  const [hasMistake, setHasMistake] = useState(false) //Ошибся ли пользователь на данном символе
  const [countMistakes, setCountMistakes] = useState(0) //Общее число ошибок
  const { data = {}, refetch } = useGetTextQuery(countForApi) //данные с апи

  async function sendRequest() { //Отправить запрос на API
    dispatch(setStart(false))
    setCountCurrentElement(0)
    if (selectedSetting === 1) {
      await setCountForApi(6)
      refetch()
    }
    else if (selectedSetting === 2 && countWords > 0) {
      await setCountForApi(100)
      refetch()
    }
    else if (selectedSetting === 3 && countSentences > 0) {
      await setCountForApi(countSentences)
      refetch()
    }
  }

  useEffect(() => { //Подкорректировать текст при получении с API
    if (data !== '' && Object.keys(data).length !== 0) {
      const textForText = data.replace('—', '-')
      if (selectedSetting === 1 || selectedSetting === 3) {
        dispatch(setText(textForText))
      }
      else {
        const sentences = textForText.split(' ').slice(0, countWords)
        dispatch(setText(sentences.join(' ')))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => { //Увеличение количества числа ошибок пользователя
    if (hasMistake) {
      setCountMistakes(countMistakes + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMistake])

  return (
    <section className='MainPage'>
      <MainSettings
        selectedSetting={selectedSetting}
        sendRequest={sendRequest}
      />
      <MainForm
        countCurrentElement={countCurrentElement}
        setCountCurrentElement={setCountCurrentElement}
        hasMistake={hasMistake}
        setHasMistake={setHasMistake}
        countMistakes={countMistakes}
        setCountMistakes={setCountMistakes}
      />
    </section >
  )
}

export default MainPage