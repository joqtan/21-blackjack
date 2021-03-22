const myModule = (() => {
    'use strict'

    let deck = []
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K']

    let playersPoints = []

    /*html references */
    const btnTake = document.querySelector('#btn-take'),
        btnstop = document.querySelector('#btn-stop'),
        btnNew = document.querySelector('#btn-new')

    const divCardsPlayer = document.querySelectorAll('.divCards'),
        poinstSmall = document.querySelectorAll('small')

    const newGame = (numPlayers = 2) => {
        deck = createDeck()

        playersPoints = []
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0)
        }

        poinstSmall.forEach((elem) => (elem.innerText = 0))
        divCardsPlayer.forEach((elem) => (elem.innerHTML = ''))
        btnTake.disabled = false
        btnstop.disabled = false
    }

    const createDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type)
            }
        }
        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type)
            }
        }
        return _.shuffle(deck)
    }

    const takeCard = () => {
        if (deck.length === 0) {
            throw 'Deck empty'
        }
        return deck.pop()
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1)
        return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1
    }

    const stackPoints = (card, turn) => {
        playersPoints[turn] += cardValue(card)
        poinstSmall[turn].innerText = playersPoints[turn]
        return playersPoints[turn]
    }
    //computer
    const createCard = (card, turn) => {
        const imgCard = document.createElement('img')
        imgCard.classList.add('cards')
        imgCard.src = `assets/cards/${card}.png`
        divCardsPlayer[turn].append(imgCard)
    }
    const winner = () => {
        const [minPoints, computerPoints] = playersPoints
        setTimeout(() => {
            if (computerPoints === minPoints) {
                alert(`it's a draw`)
            } else if (minPoints > 21) {
                alert('pc win')
            } else if (computerPoints > 21) {
                alert('you win')
            } else {
                alert('pc wins')
            }
        }, 100)
    }
    const computerTurn = (minPoints) => {
        let computerPoints = 0
        do {
            const card = takeCard()
            computerPoints = stackPoints(card, playersPoints.length - 1)
            createCard(card, playersPoints.length - 1)
        } while (computerPoints < minPoints && minPoints <= 21)
        winner()
    }
    /*
events
*/
    btnTake.addEventListener('click', () => {
        const card = takeCard()
        const playerPoints = stackPoints(card, 0)

        createCard(card, 0)

        if (playerPoints > 21) {
            console.warn('you lost')
            btnTake.disabled = true
            btnstop.disabled = true
            computerTurn(playerPoints)
        } else if (playerPoints === 21) {
            console.warn('great, 21')
            btnTake.disabled = true
            btnstop.disabled = true
            computerTurn(playerPoints)
        }
    })

    btnstop.addEventListener('click', () => {
        btnTake.disabled = true
        btnstop.disabled = true
        computerTurn(playersPoints[0])
    })

    btnNew.addEventListener('click', () => {
        newGame()
    })
    return {
        newGame: newGame,
    }
})()
