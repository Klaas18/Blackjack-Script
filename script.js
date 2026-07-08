/*
var elem = document.createElement("img");
elem.setAttribute("src", "img/cardback.png");
elem.setAttribute("height", "350");
elem.setAttribute("width", "250");
document.getElementById("dealerDiv").appendChild(elem); */

const standBtn = document.getElementById('StandBtn');
standBtn.addEventListener("click", dealersTurn);

const resetBtn = document.getElementById('ResetBtn')
resetBtn.addEventListener("click", ResetTable);

const addBtn = document.getElementById('AddBtn')
addBtn.addEventListener("click", function () { grabRanCard('player') });

const playerScoreText = document.getElementById('playerScore');
let dealerScoreText = document.getElementById('dealerScore');

const winText = document.getElementById('winText');
let dealerBusted = false;

let cardSuits = {
    1: 'clubs',
    2: 'diamonds',
    3: 'hearts',
    4: 'spades'
}

let cardList = {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
    7: 8,
    8: 9,
    9: 10,
    10: 'j',
    11: 'q',
    12: 'k',
    13: 'a'
};

let playerHand = ['p']
let playerScore = 0;

let dealerHand = ['d'];
let dealerScore = 0;


SetUp();

function SetUp() {
    dealerHand = ['d'];
    playerHand = ['p']
    AddCard('cardback.png', 'dealer');

    grabRanCard('dealer')
    grabRanCard('player');
    grabRanCard('player');

}

function grabRanCard(playerName) {
    // console.clear();
    //let name = playername + 'Hand';
    // let dupCheck = playerName + 'Imgs'

    let cardN = Math.floor((Math.random() * 13) + 1);
    let cardS = Math.floor((Math.random() * 4) + 1);

    let drawnCard = cardList[cardN] + '_' + cardSuits[cardS] + '.svg';

    let drawnCardImgs = document.getElementsByClassName(playerName + 'Cards');
    //Checks is the card is a duplicate
    for (let i = 0; i < drawnCardImgs.length; i++) {
        const element = drawnCardImgs[i];

        if (element.src.includes(drawnCard)) {
            console.log("yes")
            grabRanCard(playerName);
            break;
        }
    }

    if (playerName == 'player') {
        playerHand.push(cardList[cardN]);
    } else {
        dealerHand.push(cardList[cardN]);
    }

    AddCard(drawnCard, playerName);

    CountCardScore(playerHand);
    CountCardScore(dealerHand);
}



function AddCard(cardName, playersName) {
    var elem = document.createElement("img");
    elem.setAttribute("src", "img/" + cardName);
    elem.setAttribute("height", "350");
    elem.setAttribute("width", "250");
    elem.classList.add(playersName + 'Cards');
    document.getElementById(playersName + "Div").appendChild(elem);
}

function RemoveCard(amount) {
    let imgToRemove = document.getElementById("dealerCards");
    imgToRemove.parentNode.removeChild(imgToRemove);
}

function CountCardScore(cards) {
    let currentPoints = 0;

    if (cards[0] === 'd') {
        dealerScore = 0;
    } else {
        playerScore = 0;
    }

    for (let i = 1; i <= cards.length - 1; i++) {
        // Change How the score is checked
        if (cards[i] >= 2 && cards[i] <= 10) {
            currentPoints += cards[i];
        } else if (cards[i] === 'a') {

            currentPoints += 11;

            //1 or 11 points 
        } else {
            currentPoints += 10;
            //10 points
            //face Card
        }
    }

    if (currentPoints > 21) {
        for (let i = 0; i <= cards.length; i++) {
            if (cards[i] === 'a') {
                currentPoints -= 11;
                currentPoints += 1;
            }
        }
    }
    if (currentPoints > 21) {
        setResetButtons();
        showWinner();
    } else if (currentPoints === 21) {
        setResetButtons();
        showWinner();
    }

    if (cards[0] === 'p') {
        playerScore += currentPoints;
        playerScoreText.textContent = 'Player Score: ' + playerScore;
    } else if (cards[0] === 'd') {
        dealerScore += currentPoints;
        dealerScoreText.textContent = 'dealer Score: ' + dealerScore;
    }

}


function ResetTable() {

    let dealerImgs = document.getElementsByClassName("dealerCards");
    let playerImgs = document.getElementsByClassName('playerCards');

    // let imgLength;
    let dImgLength = dealerImgs.length;

    for (let i = 0; i <= dImgLength - 1; i++) {
        //console.log(i + ' dealer');
        dealerImgs[0].remove();
    }

    let pImgLength = playerImgs.length;
    for (let j = 0; j <= pImgLength - 1; j++) {
        playerImgs[0].remove();
        // console.log(j + ' player');
    }

    resetBtn.disabled = true;
    addBtn.disabled = false;
    standBtn.disabled = false;
    dealerBusted = false;

    winText.textContent = '';
    //winText.style.color = 'black';
    SetUp();

    //CountCardScore(playerHand);
    // CountCardScore(dealerHand);
}

function setResetButtons() {
    addBtn.disabled = true;
    resetBtn.disabled = false;
    standBtn.disabled = true;
}

function showWinner() {

    if (playerScore > dealerScore && playerScore < 21 || dealerScore > 21 || playerScore === 21) {
        winText.textContent = 'You Won';
        winText.style.color = 'green';

    } else if (playerScore < dealerScore && playerScore < 21 || playerScore > 21 || dealerScore === 21) {
        winText.textContent = 'Dealer Won';
        winText.style.color = 'red';
    } else if (dealerScore === playerScore) {
        winText.textContent = 'Draw';
        winText.style.color;
    }

}

function dealersTurn() {
    let cardN = Math.floor((Math.random() * 13) + 1);
    let cardS = Math.floor((Math.random() * 4) + 1);

    let drawnCard = cardList[cardN] + '_' + cardSuits[cardS] + '.svg';

    dealerHand.push(cardList[cardN]);

    dealerImgs = document.getElementsByClassName("dealerCards");
    dealerImgs[0].setAttribute("src", "img/" + drawnCard);

    while (!dealerBusted) {
        grabRanCard('dealer');

        if (dealerScore === 21) {
            // console.log("Dealer 21");
            setResetButtons();
            showWinner();
            break;
        }
        if (dealerScore > playerScore && dealerScore <= 21) {
            //  console.log("D " + dealerScore + " - P " + playerScore);
            // console.log("Dealer Higher then player");
            setResetButtons();
            showWinner();
            break;
        }
        if (dealerScore >= 17) {
            setResetButtons();
            showWinner();
            // console.log("dealer higher or same as 17");
            break;
        }

    }
}


