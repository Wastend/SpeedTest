import React, { useState, useEffect } from 'react'
import { useGetTextQuery } from '../../app/configs/ReceiveData'
import './MainPage.scss'
import MainSettings from './MainSettings'
import MainForm from './MainForm'

const MainPage = () => {
  const [text, setText] = useState('') //Выводимый текст
  const [countCurrentElement, setCountCurrentElement] = useState(0)
  const [countForApi, setCountForApi] = useState(10) //Количество предложений для получения с сервера
  const [countSentences, setCountSentences] = useState(0) //Необходимое количество предложений
  const [textLength, setTextLength] = useState(0) //Необходимое количество слов
  const [isActiveSettings, setIsActiveSettings] = useState(false) // открыто ли меню настроек
  const [selectedSetting, setSelectedSetting] = useState(1) // Выбранный ввод
  const [hasMistake, setHasMistake] = useState(false) //Ошибся ли пользователь на данном символе
  const [countMistakes, setCountMistakes] = useState(0) //Общее число ошибок
  const { data = {}, refetch } = useGetTextQuery(countForApi) //данные с апи
  const [start, setStart] = useState(false) // Начало выполнения теста

  async function sendRequest() { //Отправить запрос на API
    setStart(false)
    setCountCurrentElement(0)
    if (selectedSetting === 1) {
      await setCountForApi(6)
      refetch()
    }
    else if (selectedSetting === 2) {
      await setCountForApi(100)
      refetch()
    }
    else if (selectedSetting === 3) {
      await setCountForApi(countSentences)
      refetch()
    }
  }

  useEffect(() => { //Подкорректировать текст при получении с API
    if (data.text !== '' && data.text !== undefined) {
      const textForText = data.text.replace('—', '-')
      if (selectedSetting === 1 || selectedSetting === 3) {
        setText(textForText)
      }
      else {
        const sentences = textForText.split(' ').slice(0, textLength)
        setText(sentences.join(' '))
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
        setSelectedSetting={setSelectedSetting}
        isActiveSettings={isActiveSettings}
        setIsActiveSettings={setIsActiveSettings}
        countSentences={countSentences}
        setCountSentences={setCountSentences}
        textLength={textLength}
        setTextLength={setTextLength}
        sendRequest={sendRequest}
      />
      <MainForm
        text={text}
        countCurrentElement={countCurrentElement}
        setCountCurrentElement={setCountCurrentElement}
        hasMistake={hasMistake}
        setHasMistake={setHasMistake}
        countMistakes={countMistakes}
        setCountMistakes={setCountMistakes}
        start={start}
        setStart={setStart}
      />
    </section >
  )
}

export default MainPage