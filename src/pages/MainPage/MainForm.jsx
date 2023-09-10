import React, { useEffect, useState } from 'react'
import StopWatch from '../../app/components/StopWatch/StopWatch'

const MainForm = (props) => {

  const [enteredText, setEnteredText] = useState('')
  const [currentElement, setCurrentElement] = useState('')
  const [unwrittenText, setUnwrittenText] = useState('')
  const [symbolsInMin, setSymbolsInMin] = useState(0)
  const [startTime, setStartTime] = useState(new Date())
  const windowWidth = window.innerWidth

  useEffect(() => {
    if (props.text !== '' && props.text !== undefined) {
      const elements = props.text.split('')
      setEnteredText(elements.slice(0, props.countCurrentElement).join(''))
      setCurrentElement(props.text[props.countCurrentElement])
      setUnwrittenText(elements.slice(props.countCurrentElement + 1, elements.length).join(''))
    }
  }, [props.text, props.countCurrentElement])

  function regex(letter) {
    if (letter === currentElement) {
      console.log(letter, currentElement)
      const curTime = new Date()
      setSymbolsInMin(((props.countCurrentElement + 1) / ((curTime.getTime() - startTime.getTime()) / 1000) * 60).toFixed(2))
      props.setHasMistake(false)
      props.countCurrentElement === 0 ? props.setStart(true) : props.countCurrentElement === props.text.length - 1 && props.setStart(false)
      props.setCountCurrentElement(props.countCurrentElement + 1)
    }
    else if (props.countCurrentElement !== 0 && props.countCurrentElement !== props.text.length) {
      !props.hasMistake && props.setCountMistakes(props.countMistakes + 1)
      props.setHasMistake(true)
    }
  }

  document.onkeypress = function (event) {
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
        <input value={enteredText} onChange={(e) => regex(e.target.value.slice(-1))} type="text" />
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
        start={props.start}
        setCountCurrentElement={props.setCountCurrentElement}
        setStart={props.setStart}
        countMistakes={props.countMistakes}
        text={props.text}
        countCurrentElement={props.countCurrentElement}
        setCountMistakes={props.setCountMistakes}
        startTime={startTime}
        setStartTime={setStartTime}
        symbolsInMin={symbolsInMin}
      />

    </section>
  )
}

export default MainForm