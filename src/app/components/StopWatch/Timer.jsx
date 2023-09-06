import React from "react"

const Timer = (props) => {
  return (
    <div className="timer">
      <h1 className="timer__digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </h1>
      <h1 className="timer__digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </h1>
      <h1 className="timer__digits mili">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </h1>
    </div>
  )
}

export default Timer