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
    const cardNumbers = [
      ...range(0, config.cards / 2),
      ...range(0, config.cards / 2)
    ]
    shuffleArray(cardNumbers)
    this.state = { cardNumbers, score: 10, isGameWon: false }
    this.cardCloseCallbacks = []
    window.openAllCards = () => {
      this.openAllCards()
    }
    window.closeAllCards = () => {
      this.closeAllCards()
    }
    this.openCard = null
    this.numDisabledCards = 0
  }

  resetGame() {
    this.closeAllCards()
    setTimeout(() => {
      const cardNumbers = this.state.cardNumbers
      shuffleArray(cardNumbers)
      this.setState({ cardNumbers, score: 10, isGameWon: false })
      this.numDisabledCards = 0
    }, 600)
  }

  // Flips all cards to back
  closeAllCards() {
    for (let i in this.refs) {
      setTimeout(() => {
        this.refs[i].close()
        this.refs[i].enable()
      }, 20 * i)
    }
  }

  // Flips all cards to front
  openAllCards() {
    for (let i in this.refs) {
      this.refs[i].open()
    }
  }

  // When a card is flipped to its front
  onCardOpened(cardNum) {
    if (!this.refs[cardNum].isEnabled()) return
    if (this.openCard != null) {
      if (this.openCard === cardNum) {
        this.refs[cardNum].close()
        this.openCard = null
        return
      }
      const openCard = this.openCard
      const cardNumbers = this.state.cardNumbers
      if (cardNumbers[cardNum] === cardNumbers[openCard]) {
        this.setState(state => ({
          score: state.score + 10
        }))
        setTimeout(() => {
          this.refs[cardNum].disable()
          this.refs[openCard].disable()
          this.numDisabledCards += 2

          if (this.numDisabledCards >= config.cards) {
            this.setState(state => ({ isGameWon: true }))
          }
        }, 1000)
      } else {
        this.setState(state => ({
          score: Math.max(state.score - 1, 0)
        }))
        setTimeout(() => {
          this.refs[cardNum].close()
          this.refs[openCard].close()
        }, 1000)
      }
      this.openCard = null
    } else {
      this.openCard = cardNum
    }
  }

  // When a card is flipped to its back
  onCardClosed(cardNum) {
    if (cardNum === this.openCard) this.openCard = null
  }

  // When a player flips a card to its back
  onCardManuallyClosed(cardNum) {
    this.onCardClosed(cardNum)
    if (this.refs[cardNum].isEnabled()) {
      this.setState(state => ({ score: Math.max(state.score - 1, 0) }))
    }
  }

  render() {
    // Render Cards
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
          onManualClose={() => this.onCardManuallyClosed(i)}
        />
      )
    }

    // Render Body
    return (
      <div className='game-board'>
        <Navbar
          startOver={() => this.resetGame()}
          score={this.state.score}
          win={this.state.isGameWon}
        />
        <div className='card-container'>{cards}</div>
        <div />
      </div>
    )
  }
}
