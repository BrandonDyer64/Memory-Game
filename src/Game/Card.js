import React, { Component } from 'react'
import CardBackImage from './cardback.png'

const suits = ['♠', '♥', '♣', '♦']

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suit: suits[props.rawValue % suits.length]
    }
    this.suit = suits[this.props.rawValue % suits.length]
  }

  // #### Opening

  // Opens or closes card
  toggle() {
    this.classList().toggle('flip-open')
    if (this.isOpen()) {
      this.props.onOpen()
    } else {
      this.props.onManualClose()
      this.props.onClose()
    }
  }

  // Flips card to back
  close() {
    this.classList().remove('flip-open')
    this.props.onClose()
  }

  // Flips card to front
  open() {
    this.classList().add('flip-open')
    this.props.onOpen()
  }

  // Is card showing front
  isOpen() {
    return this.classList().contains('flip-open')
  }

  // #### Enabling

  // Makes card transparent
  disable() {
    this.classList().add('disable')
  }

  // Makes card opaque
  enable() {
    this.classList().remove('disable')
  }

  // Is card opaque
  isEnabled() {
    return !this.classList().contains('disable')
  }

  // List of classes on the flip container
  classList() {
    return this.refs.flipContainer.classList
  }

  render() {
    const suit = suits[this.props.rawValue % suits.length]
    return (
      <div style={{ margin: '10px' }}>
        <div
          className='flip-container'
          ref='flipContainer'
          onClick={event => this.toggle()}
        >
          <div className='flipper'>
            {/*
             *Back
             */}
            <div className='flip-back'>
              <div className='card'>
                <div className='card-back'>
                  <img src={CardBackImage} />
                </div>
              </div>
            </div>
            {/* /Back */}

            {/*
             * Front
             */}
            <div className='flip-front'>
              <div className='card'>
                <div className='card-front'>
                  {/* Suit - Upper Left */}
                  <span className='suit' style={{ textAlign: 'left' }}>
                    {suit}
                  </span>
                  {/* Card Value */}
                  <span style={{ fontSize: '2em' }}>{this.props.value}</span>
                  {/* Suit - Lower Right */}
                  <span className='suit' style={{ textAlign: 'right' }}>
                    {suit}
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
