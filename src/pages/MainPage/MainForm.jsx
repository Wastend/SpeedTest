import React, { useCallback, useEffect, useState } from 'react'

const MainForm = (props) => {

  const [enteredText, setEnteredText] = useState('')
  const [currentElement, setCurrentElement] = useState('')
  const [unwrittenText, setUnwrittenText] = useState('')

  useEffect(() => {
    if(props.text !== '' && props.text !== undefined) {
      console.log(props.text);
      const words = props.text.split(' ')
      const firstPart = words.slice(0, props.countCurrentElement+1)
      setEnteredText(words.slice(0, props.countCurrentElement).join(' '))
      setCurrentElement(props.text[props.countCurrentElement])
      setUnwrittenText(words.slice(props.countCurrentElement + 1, words.length).join(' '))
    }
  }, [props.text, props.countCurrentElement])

  const escFunction = useCallback((event) => {
    if (event.key === currentElement) {
      props.setCountCurrentElement(+props.countCurrentElement)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <section className='MainForm'>
      <p className="MainForm__text">
        <span className='MainForm__text_entered'>{enteredText + enteredText!=='' && ' '}</span>
        <span className='MainForm__text_current'>{currentElement + ' '}</span>
        <span className='MainForm__text_unwritten'>{unwrittenText}</span>
      </p>

    </section>
  )
}

export default MainForm