import React, { useState } from 'react'
import { getDataOnSentence, getDataOnWords } from '../../app/configs/ReceiveData'
import './MainPage.scss'

const MainPage = () => {
  const [text, setText] = useState('')

  async function setTextForTest(action, number) {
    if (action === 'sentence') {
      setText(await getDataOnSentence(number))
    }
    else if (action === 'words') {
      setText(await getDataOnWords(number))
    }
  }

  return (
    <div className='MainPage'>
      <div className="MainPage__buttons">
        <button onClick={() => setTextForTest('sentence', 1)}>getDataOnSentence</button>
        <button onClick={() => setTextForTest('words', 10)}>getDataOnWords</button>
      </div>
      <p>{text}</p>
    </div >
  )
}

export default MainPage