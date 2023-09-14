import React, { useState, useEffect } from 'react'
import "./StopWatch.scss"
import Timer from "./Timer"
import { useDispatch, useSelector } from 'react-redux'
import { setStart } from '../../data/dataReducer'

const StopWatch = (props) => {
  const dispatch = useDispatch()
  const start = useSelector(state => state.data.start)
  const text = useSelector(state => state.data.text)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)

  useEffect(() => { //Устанавливаем интервал времени
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

  useEffect(() => { //Включаем и выключаем таймер
    if (start) {
      handleStart()
      props.setStartTime(new Date())
    }
    else {
      handlePause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  useEffect(() => { //Если получили новые данные с API, то сбрасываем
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

  function handleReset() { //Сбрасываем прогресс
    props.setCountCurrentElement(0)
    handlePause()
    setTime(0)
    props.setCountMistakes(0)
    props.setSymbolsInMin(0)
    dispatch(setStart(false))
  }

  const percentageOfErrors = ((1 - props.countMistakes / text.length) * 100).toFixed(2)

  return (
    <section className="Stop-watch">
      <Timer time={time} />
      <h1 className='Stop-watch__results'>{"Скорость ввода " + props.symbolsInMin}</h1>
      <h1 className='Stop-watch__results'>{"Точность ввода " + percentageOfErrors + "%"}</h1>
      <button
        className='button__send'
        onClick={handleReset}
      >
        {props.countCurrentElement === text.length ? 'Начать сначала' : 'Сбросить'}
      </button>
    </section>
  )
}

export default StopWatch