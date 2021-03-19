/*
clubs
diamonds
hearts
spades
*/

let deck = []
const types = ['C', 'D', 'H', 'S']
const specials = ['A', 'J', 'Q', 'K']

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
    console.log(deck)
    return deck
}
createDeck()

const takeCard = () => {
    if (deck.length === 0) {
        throw 'Deck empty'
    }
    let card = deck.pop()
    console.log(card)
    console.log(deck)
    return card
}

// const cardValue = (card) => {
//     const value = card.substring(0, card.length - 1)
//     let points = 0
//     if (isNaN(value)) {
//         points = value === 'A' ? 11 : 10
//     } else {
//         points = value * 1
//     }
//     console.log(points)
// }
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1)
    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1
}
const value = cardValue(takeCard())
console.log({ value })
