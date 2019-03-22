import React, { Component } from 'react'

import Navbar from '../Components/Navbar'
import Card from './Card'

import { range, shuffleArray } from '../Utils'
import config from '../config.json'

import './GameBoard.css'
import './Cards.css'

export default class Game extends Component {
  constructor(props) {
    super(props)
    const cards = []
    const cardNumbers = [
      ...range(0, config.cards / 2),
      ...range(0, config.cards / 2)
    ]
    shuffleArray(cardNumbers)
    this.state = { cardNumbers }
    this.cardCloseCallbacks = []
    window.openAllCards = () => {
      this.openAllCards()
    }
    window.closeAllCards = () => {
      this.closeAllCards()
    }
  }

  resetGame() {
    this.closeAllCards()
    setTimeout(() => {
      const cardNumbers = this.state.cardNumbers
      shuffleArray(cardNumbers)
      this.setState({ cardNumbers })
    }, 600)
  }

  closeAllCards() {
    for (let i in this.refs) {
      setTimeout(() => {
        this.refs[i].close()
        this.refs[i].enable()
      }, 20 * i)
    }
  }

  openAllCards() {
    for (let i in this.refs) {
      this.refs[i].open()
    }
  }

  onCardOpened(cardNum) {}

  onCardClosed(cardNum) {}

  getCards() {
    const cards = []
    for (let i = 0; i < config.cards; i++) {
      cards.push(
        <Card
          key={i}
          ref={i}
          value={String.fromCharCode(65 + this.state.cardNumbers[i])}
          rawValue={this.state.cardNumbers[i]}
          onOpen={() => this.onCardOpened(i)}
          onClose={() => this.onCardClosed(i)}
        />
      )
      console.log(this.cardCloseCallbacks[i])
    }
    this.cards = cards
    return cards
  }

  render() {
    return (
      <div className='game-board'>
        <Navbar startOver={() => this.resetGame()} />
        <div className='card-container'>{this.getCards()}</div>
        <div />
      </div>
    )
  }
}
