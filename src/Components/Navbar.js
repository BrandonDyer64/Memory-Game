import React from 'react'
import Button from './Button'
import ForkMe from './ForkMe'

import './Navbar.css'

export default props => {
  return (
    <nav className='navbar'>
      <Button onClick={k => props.startOver()}>Start Over</Button>
      <span>
        Score: {props.score}
        {props.win ? ' - You Win!' : ''}
      </span>
      <ForkMe />
    </nav>
  )
}
