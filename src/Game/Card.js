import React, { Component } from 'react'
import CardBackImage from './cardback.png'

const symbols = ['♠', '♥', '♣', '♦']

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: symbols[props.rawValue % symbols.length]
    }
  }

  // Opening
  toggle() {
    this.refs.flipContainer.classList.toggle('flip-open')
    if (this.isOpen()) {
      this.props.onOpen()
    } else {
      this.props.onClose()
    }
  }
  close() {
    this.refs.flipContainer.classList.remove('flip-open')
    this.props.onClose()
  }
  open() {
    this.refs.flipContainer.classList.add('flip-open')
    this.props.onOpen()
  }
  isOpen() {
    return this.refs.flipContainer.classList.contains('flip-open')
  }

  // Enabling
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
                    {symbols[this.props.rawValue % symbols.length]}
                  </span>
                  <span style={{ fontSize: '2em' }}>{this.props.value}</span>
                  <span className='suit' style={{ textAlign: 'right' }}>
                    {symbols[this.props.rawValue % symbols.length]}
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
