import React, { useEffect, useState } from 'react'
import StopWatch from '../../app/components/StopWatch/StopWatch'
import { useDispatch, useSelector } from 'react-redux'
import { setStart, setCountCurrentElement, setCountMistakes, setSymbolsInMin } from '../../app/data/dataReducer'

const MainForm = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)

  const [text, setText] = useState({
    enteredText: '',
    currentElement: '',
    unwrittenText: ''
  })

  const [startTime, setStartTime] = useState(new Date()) //Время начала теста
  const [hasMistake, setHasMistake] = useState(false) //Ошибся ли пользователь на данном символе
  const [windowWidth, setWindowWidth] = useState(window.innerWidth) //Размер окна

  window.onresize = function(){ //При изменении размера окна - менять параметр windowWidth
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => { //Изменение отображаемого текста
    if (data.text !== '' && data.text !== undefined) {
      const elements = data.text.split('')
      const enteredText = (elements.slice(0, data.countCurrentElement).join(''))
      const currentElement = (data.text[data.countCurrentElement])
      const unwrittenText = (elements.slice(data.countCurrentElement + 1, elements.length).join(''))
      setText({
        enteredText,
        currentElement,
        unwrittenText
      })
    }
  }, [data.text, data.countCurrentElement])

  useEffect(() => {
    setHasMistake(false)
  }, [data.text])

  useEffect(() => { //Увеличение количества числа ошибок пользователя
    if (hasMistake) {
      dispatch(setCountMistakes(data.countMistakes + 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMistake])

  function regex(letter) { //Проверка, что символ является нужным
    if (letter === text.currentElement) {
      const curTime = new Date()
      data.countCurrentElement === 0 ? dispatch(setStart(true)) : data.countCurrentElement === data.text.length - 1 && dispatch(setStart(false))
      setHasMistake(false)
      dispatch(setSymbolsInMin(((data.countCurrentElement + 1) / ((curTime.getTime() - startTime.getTime()) / 1000) * 60).toFixed(2)))
      dispatch(setCountCurrentElement(data.countCurrentElement + 1))
    }
    else if (data.countCurrentElement !== 0 && data.countCurrentElement !== data.text.length) {
      setHasMistake(true)
    }
  }

  document.onkeydown = function (event) { //Отслеживание нажатия клавиш
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
          value={text.enteredText}
          onChange={(e) => regex(e.target.value.slice(-1))}
          type="text" />
      }
      <p className="MainForm__text">
        {
          windowWidth > 768 &&
          <span className='MainForm__text_entered'>{text.enteredText}</span>
        }
        <span className={`MainForm__text_current${hasMistake ? '_mistake' : ''}`}>{text.currentElement}</span>
        <span className='MainForm__text_unwritten'>{text.unwrittenText}</span>
      </p>
      <StopWatch setStartTime={setStartTime} />
    </section>
  )
}

export default MainForm