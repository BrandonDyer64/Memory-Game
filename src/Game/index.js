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
    // Generate card values
    const cardNumbers = [
      ...range(0, config.cards / 2),
      ...range(0, config.cards / 2)
    ]
    shuffleArray(cardNumbers)

    this.openCard = null
    this.numDisabledCards = 0
    this.isGameRunning = true

    this.state = { cardNumbers, score: config.startingScore, isGameWon: false }
  }

  // Closes and shuffles all cards
  resetGame() {
    if (!this.isGameRunning) return // Game isn't running
    this.setState({ score: 0 })
    this.isGameRunning = false
    return this.closeAllCards().then(() => {
      // Create new card values
      const cardNumbers = this.state.cardNumbers
      shuffleArray(cardNumbers)
      // Reset state values
      this.setState(
        {
          cardNumbers,
          score: config.startingScore,
          isGameWon: false
        },
        () => {
          this.isGameRunning = true
          this.numDisabledCards = 0
        }
      )
    })
  }

  // Flips all cards to back
  closeAllCards() {
    const waitOpenTime = 80
    return new Promise((resolve, reject) => {
      for (let i in this.refs) {
        const card = this.refs[i]
        // Close the card with an offset in time
        // relative to its position.
        // This will make a wave effect
        setTimeout(() => {
          // Give the closed cards a little shake
          card.setOpen(true).setEnabled(true)
          // Close the card
          setTimeout(() => card.setOpen(false), waitOpenTime)
        }, 20 * i)
      }
      setTimeout(() => resolve(), 20 * config.cards + waitOpenTime + 200)
    })
  }

  // Flips all cards to front
  openAllCards() {
    this.setCardsOpen(range(0, config.cards))
  }

  // Sets the value of score in the state
  setScore(value) {
    if (typeof value === 'function') {
      /* Functional */
      this.setState(state => ({
        score: value(state.score)
      }))
    } else {
      /* Absolute */
      this.setState({ score: value })
    }
  }

  // When a card is flipped to its front
  onCardOpened(cardNum) {
    const card = this.refs[cardNum]

    // Game is not running
    if (!this.isGameRunning) return
    // Card is disabled
    if (!card.isEnabled()) return
    // There is no other open card
    if (this.openCard == null) {
      this.openCard = cardNum
      return
    }
    // Card was already open
    if (this.openCard === cardNum) {
      this.setCardsOpen(false, cardNum)
      this.openCard = null
      return
    }

    const openCard = this.refs[this.openCard]
    const cardNumbers = this.state.cardNumbers

    if (cardNumbers[cardNum] === cardNumbers[this.openCard]) {
      /* Match! */
      // Update Score
      this.setScore(score => score + config.matchPoints)
      // Fade after timeout
      setTimeout(() => {
        // Fade out
        card.setEnabled(false)
        openCard.setEnabled(false)
        // Update game winnig points
        this.numDisabledCards += 2
        if (this.numDisabledCards >= config.cards) {
          this.setState(state => ({ isGameWon: true }))
        }
      }, 1000)
    } else {
      /* No Match. */
      // Update Score
      this.setScore(score => Math.max(score + config.matchFailPoints, 0))
      // Flip after timeout
      setTimeout(() => {
        card.setOpen(false)
        openCard.setOpen(false)
      }, 1000)
    }
    // There are no open cards anymore
    this.openCard = null
  }

  // When a card is flipped to its back
  onCardClosed(cardNum) {
    if (cardNum === this.openCard) this.openCard = null
  }

  // When a player flips a card to its back
  onCardManuallyClosed(cardNum) {
    this.onCardClosed(cardNum)
    if (this.refs[cardNum].isEnabled()) {
      this.setState(state => ({
        score: Math.max(state.score + config.cardClosePoints, 0)
      }))
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
