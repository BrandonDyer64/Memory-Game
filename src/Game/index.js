import React, { Component } from 'react'
import './GameBoard.css'
import './Cards.css'

export default class Game extends Component {
  constructor(props) {
    super(props)
    const cards = []
    for (var i = 0; i < 24; i++) {
      cards.push(<div class='card' />)
    }
    this.state = {
      cards
    }
  }

  render() {
    return (
      <div className='game-board'>
        <div className='card-container'>{this.state.cards}</div>
      </div>
    )
  }
}
