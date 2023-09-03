import React from 'react'
import './ErrorPage.scss'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error'>
      <NavLink to='/'>
        <h4 className='error__text'>Вы перешли на несуществующую страницу!</h4>
        <h4 className='error__text'>Вернуться на главную страницу</h4>
      </NavLink>
    </section>
  )
}

export default ErrorPage