import React, { useEffect, useState } from 'react'
import StopWatch from '../../app/components/StopWatch/StopWatch'
import { useDispatch, useSelector } from 'react-redux'
import { setStart } from '../../app/data/dataReducer'

const MainForm = (props) => {
  const dispatch = useDispatch()
  const text = useSelector(state => state.data.text)
  const [enteredText, setEnteredText] = useState('') //Введенный текст
  const [currentElement, setCurrentElement] = useState('') //Текущий символ
  const [unwrittenText, setUnwrittenText] = useState('') //Невведеный текст
  const [symbolsInMin, setSymbolsInMin] = useState(0) //Количество символов в минуту
  const [startTime, setStartTime] = useState(new Date()) //Время начала теста
  const windowWidth = window.innerWidth //Размер окна

  useEffect(() => { //Изменение отображаемого текста
    if (text !== '' && text !== undefined) {
      const elements = text.split('')
      setEnteredText(elements.slice(0, props.countCurrentElement).join(''))
      setCurrentElement(text[props.countCurrentElement])
      setUnwrittenText(elements.slice(props.countCurrentElement + 1, elements.length).join(''))
    }
  }, [text, props.countCurrentElement])

  function regex(letter) { //Проверка, что символ является нужным
    if (letter === currentElement) {
      const curTime = new Date()
      setSymbolsInMin(((props.countCurrentElement + 1) / ((curTime.getTime() - startTime.getTime()) / 1000) * 60).toFixed(2))
      props.setHasMistake(false)
      props.countCurrentElement === 0 ? dispatch(setStart(true)) : props.countCurrentElement === text.length - 1 && dispatch(setStart(false))
      props.setCountCurrentElement(props.countCurrentElement + 1)
    }
    else if (props.countCurrentElement !== 0 && props.countCurrentElement !== text.length) {
      props.setHasMistake(true)
    }
  }

  document.onkeypress = function (event) { //Отслеживание нажатия клавиш
    if (windowWidth >= 768) {
      if (event.key === ' ') {
        event.preventDefault()
      }
      regex(event.key)
    }
  }

  return (
    <section className='MainForm'>
      {
        windowWidth <= 768 &&
        <input
          value={enteredText}
          onChange={(e) => regex(e.target.value.slice(-1))}
          type="text" />
      }
      <p className="MainForm__text">
        {
          windowWidth > 768 &&
          <span className='MainForm__text_entered'>{enteredText}</span>
        }
        <span className={`MainForm__text_current${props.hasMistake ? '_mistake' : ''}`}>{currentElement}</span>
        <span className='MainForm__text_unwritten'>{unwrittenText}</span>
      </p>
      <StopWatch
        setCountCurrentElement={props.setCountCurrentElement}
        countMistakes={props.countMistakes}
        countCurrentElement={props.countCurrentElement}
        setCountMistakes={props.setCountMistakes}
        startTime={startTime}
        setStartTime={setStartTime}
        symbolsInMin={symbolsInMin}
        setSymbolsInMin={setSymbolsInMin}
      />
    </section>
  )
}

export default MainForm