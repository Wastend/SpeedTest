import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCountSentences, setCountWords, setSelectedSetting } from '../../app/data/settingsReducer'

const MainSettings = (props) => {
  const dispatch = useDispatch()
  const settings = useSelector(state => state.settings)

  const [isActiveSettings, setIsActiveSettings] = useState(false) // открыто ли меню настроек

  return (
    <section className='Settings'>
      <h1
        className='Settings__header'
      >
        Начните тест и проверьте свою скорость!
      </h1>
      <button
        className='Settings__button'
        onClick={() => setIsActiveSettings(!isActiveSettings)}
      >
        Открыть дополнительные настройки
        <div className={`arrow_${isActiveSettings ? 'active' : 'inactive'}`}></div>
      </button>

      <div className={`Settings__setup${isActiveSettings ? ' active' : ' inactive'}`}>
        <div className="Settings__setup_block">
          <button
            className='Settings__setup_button'
            onClick={() => dispatch(setSelectedSetting(1))}
          >
            <div
              className={`Settings__setup_radio${settings.selectedSetting === 1 ? ' active' : ''}`}
            />
            <span
              className='Settings__setup_text'
            >
              Текст по умолчанию
            </span>
          </button>
        </div>
        <div className="Settings__setup_block">
          <button
            className='Settings__setup_button'
            onClick={() => dispatch(setSelectedSetting(2))}
          >
            <div
              className={`Settings__setup_radio${settings.selectedSetting === 2 ? ' active' : ''}`}
            />
            <span
              className='Settings__setup_text'
            >
              Текст по кол-ву слов
            </span>
          </button>

          <input
            type="text"
            className='Settings__setup_input'
            value={settings.countWords}
            placeholder='1-999'
            onChange={(e) => dispatch(setCountWords(e.target.value))}
          />
        </div>
        <div className="Settings__setup_block">
          <button
            className='Settings__setup_button'
            onClick={() => dispatch(setSelectedSetting(3))}
          >
            <div
              className={`Settings__setup_radio${settings.selectedSetting === 3 ? ' active' : ''}`}
            />
            <span
              className='Settings__setup_text'
            >
              Текст по кол-ву предложений
            </span>
          </button>

          <input
            type="text"
            className='Settings__setup_input'
            value={settings.countSentences}
            placeholder='1-99'
            onChange={(e) => dispatch(setCountSentences(e.target.value))}
          />
        </div>
        <p className='text__error'>{settings.error}</p>
        <button
          className='button__send'
          disabled={settings.error !== ''}
          onClick={props.sendRequest}
        >
          Подтвердить
        </button>
      </div>
    </section>
  )
}

export default MainSettings