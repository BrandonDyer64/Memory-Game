import React, { Component } from 'react'

export default class Card extends Component {
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
                <div className='card-back' />
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
