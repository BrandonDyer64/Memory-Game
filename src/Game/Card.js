import React, { Component } from 'react'
import CardBackImage from './cardback.png'

const suits = ['♠', '♥', '♣', '♦']

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      enabled: true
    }
  }

  // #### Opening

  // Opens or closes card
  toggle() {
    return new Promise((resolve, reject) => {
      this.setState(
        state => ({ open: !state.open }),
        () => {
          if (this.isOpen()) {
            this.props.onOpen()
            resolve(true)
          } else {
            this.props.onClose()
            resolve(false)
          }
        }
      )
    })
  }

  // When player opens or closes card
  onManualToggle() {
    if (!this.isEnabled()) return // Card is disabled
    // Toggle card
    this.toggle().then(isOpen => {
      if (!this.isOpen()) {
        this.props.onManualClose()
      }
    })
  }

  // Set if card is showing front or back
  setOpen(open) {
    this.setState({ open })
    if (open) {
      this.props.onOpen()
    } else {
      this.props.onClose()
    }
    return this
  }

  // Is card showing front
  isOpen() {
    return this.state.open
  }

  // #### Enabling

  setEnabled(enabled) {
    this.setState({ enabled })
    return this
  }

  // Is card opaque
  isEnabled() {
    return this.state.enabled
  }

  render() {
    const suit = suits[this.props.rawValue % suits.length]
    return (
      <div style={{ margin: '10px' }}>
        <div
          className={
            'flip-container' +
            (this.state.open ? ' flip-open' : '') +
            (this.state.enabled ? '' : ' disable')
          }
          ref='flipContainer'
          onClick={event => this.onManualToggle()}
        >
          <div className='flipper'>
            {/*
             *Back
             */}
            <div className='flip-back'>
              <div className='card'>
                <div className='card-back'>
                  <img src={CardBackImage} alt='Card back' />
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
