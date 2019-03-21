import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    return (
      <div style={{ margin: '10px' }}>
        <div
          className='flip-container'
          onClick={event => {
            event.currentTarget.classList.toggle('hover')
          }}
        >
          <div className='flipper'>
            <div className='flip-front'>
              <div className='card'>
                <div className='card-back' />
              </div>
            </div>

            <div className='flip-back'>
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
          </div>
        </div>
      </div>
    )
  }
}
