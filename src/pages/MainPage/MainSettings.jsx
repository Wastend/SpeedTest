import React, { useState } from 'react'

const MainSettings = (props) => {

  const [isActive, setIsActive] = useState(false)

  return (
    <section className='settings'>
      <h1 className='settings__header'>Начните тест и проверьте свою скорость!</h1>
      <button className='settings__button' onClick={() => setIsActive(!isActive)}>
        Открыть дополнительные настройки
        <div className={`arrow_${isActive ? 'active' : 'inactive'}`}></div>
      </button>
      {isActive &&
        <div className="settings__setup">
          <button className='settings__button' onClick={() => props.setTextForTest('words', 10)}>Установить 10 слов</button>
          <button className='settings__button' onClick={() => props.setTextForTest('sentence', 2)}>Установить 2 предложения</button>
        </div>
      }
    </section>
  )
}

export default MainSettings