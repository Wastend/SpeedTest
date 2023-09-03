import React from 'react'
import './Header.scss'
import { images } from '../../assets/Images'

const Header = () => {
  return (
    <header>
      <img src={images.logo} alt="logo" />
      <h1 className='title'>SpeedTest</h1>
    </header>
  )
}

export default Header