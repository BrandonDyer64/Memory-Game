import React, { Component } from 'react'
import CardBackImage from './cardback.png'

export default class Card extends Component {
  constructor(props) {
    super(props)
  }
  toggle() {
    this.refs.flipContainer.classList.toggle('flip-open')
  }
  close() {
    this.refs.flipContainer.classList.remove('flip-open')
  }
  open() {
    this.refs.flipContainer.classList.add('flip-open')
  }
  isOpen() {
    return this.refs.flipContainer.classList.contains('flip-open')
  }
  disable() {
    this.refs.flipContainer.classList.add('disable')
  }
  enable() {
    this.refs.flipContainer.classList.remove('disable')
  }
  isEnabled() {
    return !this.refs.flipContainer.classList.contains('disable')
  }

  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div
          className='flip-container'
          ref='flipContainer'
          onClick={event => this.toggle()}
        >
          <div className='flipper'>
            {/* Back */}
            <div className='flip-back'>
              <div className='card'>
                <div className='card-back'>
                  <img src={CardBackImage} />
                </div>
              </div>
            </div>
            {/* /Back */}

            {/* Front */}
            <div className='flip-front'>
              <div className='card'>
                <div className='card-front'>
                  <span className='suit' style={{ textAlign: 'left' }}>
                    ♦
                  </span>
                  <span style={{ fontSize: '2em' }}>{this.props.value}</span>
                  <span className='suit' style={{ textAlign: 'right' }}>
                    ♦
                  </span>
                </div>
              </div>
            </div>
            {/* /Front */}
          </div>
        </div>
      </div>
    )
  }
}
