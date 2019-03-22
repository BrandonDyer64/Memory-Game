import React from 'react'
import Button from '../Components/Button'

import './Navbar.css'

export default props => {
  return (
    <nav className='navbar'>
      <Button onClick={k => props.startOver()}>Start Over</Button>
      <span>Score: {props.score}</span>
    </nav>
  )
}
