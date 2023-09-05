import React from 'react'

const MainSettings = (props) => {

  return (
    <section className='settings'>
      <h1 className='settings__header'>Начните тест и проверьте свою скорость!</h1>
      <button className='settings__button' onClick={() => props.setIsActiveSettings(!props.isActiveSettings)}>
        Открыть дополнительные настройки
        <div className={`arrow_${props.isActiveSettings ? 'active' : 'inactive'}`}></div>
      </button>

      <div className={`settings__setup${props.isActiveSettings ? ' active' : ' inactive'}`}>
        <div className="settings__setup_block">
          <button
            className='settings__setup_button'
            onClick={() => props.setSelectedSetting(1)}
          >
            <div
              className={`settings__setup_radio${props.selectedSetting === 1 ? ' active' : ''}`}
            />
            <span
              className='settings__setup_text'>
              Текст по умолчанию
            </span>
          </button>
        </div>
        <div className="settings__setup_block">
          <button
            className='settings__setup_button'
            onClick={() => props.setSelectedSetting(2)}
          >
            <div
              className={`settings__setup_radio${props.selectedSetting === 2 ? ' active' : ''}`}
            />
            <span
              className='settings__setup_text'>
              Текст по кол-ву слов
            </span>
          </button>

          <input
            type="number"
            className='settings__setup_input'
            placeholder='№'
            onChange={(e) => props.setTextLength(e.target.value)}
          />
        </div>
        <div className="settings__setup_block">
          <button
            className='settings__setup_button'
            onClick={() => props.setSelectedSetting(3)}
          >
            <div
              className={`settings__setup_radio${props.selectedSetting === 3 ? ' active' : ''}`}
            />
            <span
              className='settings__setup_text'>
              Текст по кол-ву предложений
            </span>
          </button>

          <input
            type="number"
            className='settings__setup_input'
            placeholder='№'
            onChange={(e) => props.setCountSentences(e.target.value)}
          />
        </div>
        <button 
        className='button__send'
        onClick={props.sendRequest}>Подтвердить</button>
      </div>
    </section>
  )
}

export default MainSettings