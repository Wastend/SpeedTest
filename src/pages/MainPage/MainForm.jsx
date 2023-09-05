import React, { useEffect, useState } from 'react'

const MainForm = (props) => {

  const [enteredText, setEnteredText] = useState('')
  const [currentElement, setCurrentElement] = useState('')
  const [unwrittenText, setUnwrittenText] = useState('')

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
      props.setCountCurrentElement(props.countCurrentElement + 1)
    }
  }

  return (
    <section className='MainForm'>
      <p className="MainForm__text">
        <span className='MainForm__text_entered'>{enteredText}</span>
        <span className='MainForm__text_current'>{currentElement}</span>
        <span className='MainForm__text_unwritten'>{unwrittenText}</span>
      </p>

    </section>
  )
}

export default MainForm