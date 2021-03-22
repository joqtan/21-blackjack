/*
clubs
diamonds
hearts
spades
*/

let deck = []
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']
let playerPoints = 0,
    computerPoints = 0

/*html references */
const btnTake = document.querySelector('#btn-take')
const btnstop = document.querySelector('#btn-stop')
const btnNew = document.querySelector('#btn-new')
const divPlayerCards = document.querySelector('#player-cards')
const divComputerCards = document.querySelector('#computer-cards')
const poinstSmall = document.querySelectorAll('small')
const message = ''

const createDeck = () => {
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
    // console.log(deck)
    deck = _.shuffle(deck)
    return deck
}

createDeck()

const takeCard = () => {
    if (deck.length === 0) {
        throw 'Deck empty'
    }
    let card = deck.pop()
    return card
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1)
    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1
}

//computer

const computerTurn = (minPoints) => {
    do {
        const card = takeCard()
        computerPoints += cardValue(card)
        poinstSmall[1].innerText = computerPoints

        const imgCard = document.createElement('img')
        imgCard.classList.add('cards')
        imgCard.src = `assets/cards/${card}.png`
        divComputerCards.append(imgCard)
        if (minPoints > 21) {
            break
        }
    } while (computerPoints < minPoints && minPoints <= 21)

    setTimeout(() => {
        if (minPoints === 21) {
            alert(`it's a draw`)
        } else if (computerPoints === playerPoints) {
            alert(`it's a draw`)
        } else if (minPoints > 21) {
            alert(`pc wins`)
        } else if (computerPoints > 21) {
            alert('you win')
        } else if (playerPoints > computerPoints) {
            alert('you win')
        } else {
            alert('pc wins')
        }
    }, 30)
}
/*
events
*/
btnTake.addEventListener('click', () => {
    const card = takeCard()
    playerPoints += cardValue(card)
    poinstSmall[0].innerText = playerPoints
    const imgCard = document.createElement('img')
    imgCard.classList.add('cards')
    imgCard.src = `assets/cards/${card}.png`
    divPlayerCards.append(imgCard)

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
    computerTurn(playerPoints)
})

btnNew.addEventListener('click', () => {
    deck = []
    createDeck()
    playerPoints = 0
    computerPoints = 0
    poinstSmall[0].innerText = 0
    poinstSmall[1].innerText = 0
    divComputerCards.innerHTML = ''
    divPlayerCards.innerHTML = ''
    btnTake.disabled = false
    btnstop.disabled = false
})
