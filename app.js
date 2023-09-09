const cardArray = [
    {
        name: 'moon',
        img: 'images/moon.jpg',
    },
    {
        name: 'cherry',
        img: 'images/cherry.jpg',
    },
    {
        name: 'tree',
        img: 'images/tree.jpg',
    },
    {
        name: 'lemon',
        img: 'images/lemon.jpg',
    },
    {
        name: 'cats',
        img: 'images/cats.jpeg',
    },
    {
        name: 'dino',
        img: 'images/dino.jpeg',
    },
    {
        name: 'moon',
        img: 'images/moon.jpg',
    },
    {
        name: 'cherry',
        img: 'images/cherry.jpg',
    },
    {
        name: 'tree',
        img: 'images/tree.jpg',
    },
    {
        name: 'lemon',
        img: 'images/lemon.jpg',
    },
    {
        name: 'cats',
        img: 'images/cats.jpeg',
    },
    {
        name: 'dino',
        img: 'images/dino.jpeg',
    },
];

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
let moves = 0;
let mistakes = 0;

const container = document.querySelector(".container");
const alert = document.querySelector(".alert");
const play = document.getElementById("start");
const errorDisplay = document.querySelector("#error");
const shotsDisplay = document.querySelector("#shots");
const hour = document.querySelector(".h");
const min = document.querySelector(".m");
const sec = document.querySelector(".s");
const overlay = document.querySelector(".overlay");

cardArray.sort(() => 0.5 - Math.random());


createBoard();

// Start The Game 
play.addEventListener('click', () => {
    play.classList.add("hidden");
    overlay.classList.add("hidden");
    getTime();
});

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.jpeg');
        card.setAttribute('data-id', i);

        card.addEventListener('click', flipcard);

        container.appendChild(card);
    }
}

function flipcard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');

    if (cardsChosenIds[0] == cardsChosenIds[1]) {
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.jpeg');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.jpeg');
        displayAlert('You click the same image', 'lose');
        mistakes++;
        errorDisplay.innerHTML = mistakes;
    } else if (cardsChosen[0] == cardsChosen[1]) {
        displayAlert('You found a match', 'win');
        cards[cardsChosenIds[0]].setAttribute('src', 'images/white.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/white.png');

        cards[cardsChosenIds[0]].removeEventListener('click', flipcard);
        cards[cardsChosenIds[1]].removeEventListener('click', flipcard);
        cardsWon.push(cardsChosen);
    } else {
        cards[cardsChosenIds[0]].setAttribute('src', 'images/blank.jpeg');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/blank.jpeg');
        displayAlert('sorry, try again', 'lose');
        mistakes++;
        errorDisplay.innerHTML = mistakes;
    }
    
    moves++;
    shotsDisplay.innerHTML = moves;

    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        displayAlert('Congratulation! you found them all', 'win');
    }
}

// Calcul Time
function getTime() {
    let s = 0;
    let m = 0;
    let h = 0;

    const counter = setInterval(() => {
        s++;
        if (s == 60) {
            s = 0;
            m++;
        }
        if (m == 60) {
            m = 0;
            h++;
        }

        if (s < 10) { 
            sec.innerHTML = `0${s} `;
        } else {
            sec.innerHTML = `${s} `;
        }
        if (m < 10) { 
            min.innerHTML = `0${m} : `;
        } else {
            min.innerHTML = `${m} : `;
        }

        // Stop Counter
        if (cardsWon.length == cardArray.length/2) {
            clearInterval(counter);
        }
    }, 1000);

}

// Display Alert 
function displayAlert(msg, stat) {
    alert.textContent = msg;
    alert.classList.add(stat);

    // remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(stat);
    }, 800);
}




