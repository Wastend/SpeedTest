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
  const [hasMistake, setHasMistake] = useState(false)
  const [countMistakes, setCountMistakes] = useState(0)
  const { data = {} } = useGetTextQuery(countForApi) //данные с апи

  function sendRequest() {
    setCountCurrentElement(0)
    if (selectedSetting === 1) {
      setCountForApi(10)
    }
    else if (selectedSetting === 2) {
      setCountForApi(100)
    }
    else if (selectedSetting === 3) {
      setCountForApi(countSentences)
    }
  }


  useEffect(() => {
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

  return (
    <section className='MainPage'>
      <MainSettings
        selectedSetting={selectedSetting}
        setSelectedSetting={setSelectedSetting}
        isActiveSettings={isActiveSettings}
        setIsActiveSettings={setIsActiveSettings}
        setCountSentences={setCountSentences}
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
      />
    </section >
  )
}

export default MainPage