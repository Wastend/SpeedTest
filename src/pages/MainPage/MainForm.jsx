import React, { useState } from 'react'
/* должен быть текст в 3 состоятниях
1 - Символ не введен - серый
2 - Символ введен корректно - зеленый
3 - Символ введен некорректно - красный
*/
const MainForm = (props) => {

  const [inputText, setInputText] = useState('')

  return (
    <section className='MainForm'>
      <input type="text" onChange={(e) => setInputText(e.target.value)} placeholder='Введите текст'/>
      <div className="MainForm__text">
        {/* {[...props.currentText].map((el, index) => console.log(el))} */}
        {props.currentText}
      </div>

    </section>
  )
}

export default MainForm