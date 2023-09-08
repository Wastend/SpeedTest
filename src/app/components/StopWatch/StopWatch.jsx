import React, { useState, useEffect } from 'react'
import "./StopWatch.scss"
import Timer from "./Timer"

const StopWatch = (props) => {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)

  useEffect(() => { //Устанавливаем интервал времени и вывключаем таймер
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  useEffect(() => {
    if (props.start) {
      handleStart()
      props.setStartTime(new Date())
    }
    else {
      handlePause()
    }
  }, [props.start])

  useEffect(() => {
    if (props.countCurrentElement === 0)
      handleReset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.countCurrentElement])

  function handleStart() { //Запускаем таймер
    setTime(0)
    setIsActive(true)
    setIsPaused(false)
  }

  function handlePause() { //Ставим паузу
    setIsActive(false)
    setIsPaused(true)
  }

  function handleReset() {
    props.setCountCurrentElement(0)
    handlePause()
    setTime(0)
    props.setCountMistakes(0)
    props.setStart(false)
  }

  const percentageOfErrors = ((1 - props.countMistakes / props.text.length) * 100).toFixed(2)

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <button className='stop-watch settings__button' onClick={handleReset}>{props.countCurrentElement === props.text.length ? 'Начать сначала' : 'Сбросить'}</button>
      <h1 className='stop-watch__results'>{"Скорость ввода " + props.symbolsInMin}</h1>
      <h1 className='stop-watch__results'>{"Точность ввода " + percentageOfErrors + "%"}</h1>
    </div>
  )
}

export default StopWatch