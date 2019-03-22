import React from 'react'
import './Button.css'

export default props => {
  return (
    <button className='btn' onClick={() => props.onClick()}>
      {props.children}
    </button>
  )
}
