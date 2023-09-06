import React, { useEffect, useState } from 'react'
import StopWatch from '../../app/components/StopWatch/StopWatch'

const MainForm = (props) => {

  const [enteredText, setEnteredText] = useState('')
  const [currentElement, setCurrentElement] = useState('')
  const [unwrittenText, setUnwrittenText] = useState('')
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (props.text !== '' && props.text !== undefined) {
      const elements = props.text.split('')
      setEnteredText(elements.slice(0, props.countCurrentElement).join(''))
      setCurrentElement(props.text[props.countCurrentElement])
      setUnwrittenText(elements.slice(props.countCurrentElement + 1, elements.length).join(''))
    }
  }, [props.text, props.countCurrentElement])

  document.onkeypress = function (event) {
    if (event.key === currentElement) {
      props.setHasMistake(false)
      props.countCurrentElement === 0 ? setStart(true) : props.countCurrentElement === props.text.length-1 && setStart(false)
      props.setCountCurrentElement(props.countCurrentElement + 1)
    }
    else {
      !props.hasMistake && props.setCountMistakes(props.countMistakes+1)
      props.setHasMistake(true)
    }
  }

  return (
    <section className='MainForm'>
      <p className="MainForm__text">
        <span className='MainForm__text_entered'>{enteredText}</span>
        <span className={`MainForm__text_current${props.hasMistake ? '_mistake' : ''}`}>{currentElement}</span>
        <span className='MainForm__text_unwritten'>{unwrittenText}</span>
      </p>
      <StopWatch start={start} setCountCurrentElement={props.setCountCurrentElement} setStart={setStart} countMistakes={props.countMistakes} text={props.text}/>

    </section>
  )
}

export default MainForm