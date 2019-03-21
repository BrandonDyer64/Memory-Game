import React, { Component } from 'react'
import Card from './Card'
import { range, shuffleArray } from '../Utils'
import './GameBoard.css'
import './Cards.css'

export default class Game extends Component {
  constructor(props) {
    super(props)
    const cards = []
    const cardNumbers = [...range(0, 12), ...range(0, 12)]
    shuffleArray(cardNumbers)
    for (var i = 0; i < 24; i++) {
      cards.push(<Card number={cardNumbers[i]} />)
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
