import React, { useState, useEffect } from 'react'
import { useGetTextQuery } from '../../app/configs/ReceiveData'
import './MainPage.scss'
import MainSettings from './MainSettings'
import MainForm from './MainForm'

const MainPage = () => {
  const [text, setText] = useState('')
  const [count, setCount] = useState(10)
  const [textLength, setTextLength] = useState(0)
  const { data = {}, isLoading } = useGetTextQuery(count)

  const currentText = 'АБв576'

  useEffect(() => {
    if (textLength === 0) {
      setText(data.text)
    }
    else {
      const sentences = data.text.split(' ').slice(0, textLength)
      setText(sentences.join(' '))
    }
  }, [data])


  async function setTextForTest(action, number) {
    if (action === 'sentence') {
      setCount(number)
      setTextLength(0)
    }
    else if (action === 'words') {
      setCount(100)
      setTextLength(number)
    }
  }

  return (
    <section className='MainPage'>
      <MainSettings setTextForTest={setTextForTest} />
      <MainForm currentText={text} />
    </section >
  )
}

export default MainPage