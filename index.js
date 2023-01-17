//******VARIABLES******//
let name = prompt('Welcome to Blackjack, what is your name?');

let player = {
    name: name,
    chips: 150
}

if (name === null) {
    player.name = "Player"
} else if (name === "") {
    player.name = "Player"
}

let cards = []; //array that contains the cards. empty to start with as cards not added till starting game
let sum = 0; // no cards yet so sume = 0;
let hasBlackJack = false;
let isAlive = false; //player has not started yet so not 'alive in game'
let message = " ";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let startBtn = document.getElementById("start-btn");
let cardBtn = document.getElementById("card-btn");

playerEl.textContent = player.name + ": $" + player.chips;


//******FUNCTIONS******//
//Pick a random card
function getRandomCard() {
    // get a random number between 1 and 13 (deck of cards). Math.floor gives a whole number
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber;
    }
}

//Start game using start game button
function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();

    startBtn.style.display = "none";
}

//Show the game on page and the actual game play, win lose etc
function renderGame() {
    cardsEl.textContent = "Cards: "; //loops through cards and displays on page
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    //If else to find sum and if you can draw a car, got blackjack or lose
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if ( sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true;
        startBtn.style.display = "block";
    } else {
        message = "You're out of the game!"
        startBtn.style.display = "block";
        isAlive = false;
    }
    //Renders message on page if you can draw crad, got blackjack or lost
    messageEl.textContent = message;
};

//Select a new card to add to the sum
function newCard() {
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if (isAlive === true && hasBlackJack === false || isAlive === true && hasBlackJack === true) {
        let card = getRandomCard();
        sum += card; // Add the new card to the sum variable
        cards.push(card); // adds the new card to the array
        renderGame();
    }
}