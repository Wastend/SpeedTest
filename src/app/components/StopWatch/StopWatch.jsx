import React, { useState, useEffect } from 'react'
import "./StopWatch.scss"
import Timer from "./Timer"
import { useDispatch, useSelector } from 'react-redux'
import { setCountCurrentElement, setCountMistakes, setStart } from '../../data/dataReducer'

const StopWatch = (props) => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)

  const [time, setTime] = useState(0)

  useEffect(() => { //Устанавливаем интервал времени
    let interval = null
    setTime(0)
    if (data.start) {
      props.setStartTime(new Date())
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
      dispatch(setCountCurrentElement(0))
      dispatch(setCountMistakes(0))
      props.setSymbolsInMin(0)
    }
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.start])

  const percentageOfErrors = ((1 - data.countMistakes / data.text.length) * 100).toFixed(2)

  return (
    <section className="Stop-watch">
      <Timer time={time} />
      <h1 className='Stop-watch__results'>{"Скорость ввода " + props.symbolsInMin}</h1>
      <h1 className='Stop-watch__results'>{"Точность ввода " + percentageOfErrors + "%"}</h1>
      <button
        className='button__send'
        onClick={() => dispatch(setStart(false))}
      >
        {props.countCurrentElement === data.text.length ? 'Начать сначала' : 'Сбросить'}
      </button>
    </section>
  )
}

export default StopWatch