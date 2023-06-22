const startBtn = document.getElementById('startBtn');
const startGame = document.getElementById('startGame');
const playerStats = document.getElementById('playerStats');
const playerInfo = document.getElementById('playerInfo');
const proceedBtn = document.getElementById('proceedBtn');
const startOver = document.getElementById('startOver');
const welcomeMsg = document.getElementById('welcomeMsg');
const welcomeMenu = document.getElementById('welcome');
const intro = document.getElementById('intro');
const shipInfo = document.getElementById('shipInfo');
const playerBtns = document.getElementById('playerBtns');
const attackBtn = document.getElementById('playerAttack');
const retreatBtn = document.getElementById('playerRetreat');
const aliens = document.querySelector('.aliens');
const earth = document.querySelector('.earth');
const gameProg = document.getElementById('gameProg');

const player = document.createElement('h4');

let playerName;
let alienImg;
let alien = [];
let firstAlien;
let yourShip;
let gameUpdate = [];

class Ship {
    constructor (hull, firepower, accuracy) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(enemy) {
        let chance = Math.random();
        if (chance < this.accuracy) {
            enemy.hull -= this.firepower;
            return true;
        } else if (chance > this.accuracy) {
            return false;
        };
    }
    retreat() {
        alert(`Are you sure?`);
        restart();
    }
}

class earthShip extends Ship {
    constructor () {
        super(20, 5, .7);
    }
}

class alienShip extends Ship {
    constructor () {
        super(
            Math.floor(Math.random() * (6 - 3 + 1)) + 3,
            Math.floor(Math.random() * (4 - 2 + 1)) + 2,
            Math.random() * (0.8 - 0.6) + 0.6,
        )
    }
}

// toggle display of menu and interactive buttons
function displayMenu(show) {
    const display = show ? 'block' : 'none';
    proceedBtn.style.display = display;
    startOver.style.display = display;
    welcomeMsg.style.display = display;
}

function displayBtns(show) {
    const display = show ? 'block' : 'none';
    attackBtn.style.display = display;
    retreatBtn.style.display = display;
}

function empty(element) {
    element.textContent = '';
    element.innerHTML = '';
}

// 'save the world' button click requires value input to begin game
startBtn.addEventListener('click', function(event) {
    playerName = prompt("Enter your player name to begin.");
    if (playerName === '') {
        alert(`Name cannot be blank. No name, no game!`)
    } 
    if (playerName) {
        displayMenu(true);
        startBtn.style.display = 'none';
        welcomeMsg.innerText = `Welcome, ${playerName}! Are you ready to save the universe?`;
    }
     else {
        displayMenu(false);
    }
})

// 'prepare for battle' click starts the game; previous player is removed (if any) / player and enemy are created
proceedBtn.addEventListener('click', function(event) {
    startBtn.style.display = 'none';
    displayMenu(false);
    intro.style.display = 'none';
    playerStats.style.display = 'flex';
    displayBtns(true);
    empty(player);
    createPlayer();
    createEnemy();
})

// 'start over' btn click allows user to enter new player name
startOver.addEventListener('click', function(event) {
    startBtn.style.display = 'block';
    displayMenu(false);
    empty(earth);
    empty(aliens);
})


function createPlayer() {
    yourShip = new earthShip;
    let shipImg = document.createElement('img');
    shipImg.src = '/earthShip.png';
    earth.append(shipImg);
    player.textContent = `The USS Assembly has been deployed. Commander ${playerName} will steer us to victory!`;
    playerInfo.prepend(player);
    updateShipInfo();
}

function createEnemy() {
    for (let i = 0; i < 6; i++) {
        alien[i] = new alienShip;
    }
    for (let i = 0; i < alien.length; i++) {
        alienImg = document.createElement('img');
        alienImg.src = '/alien.png';
        aliens.append(alienImg);
    }
    aliens.classList.add('slideIn');
    firstAlien = document.querySelector('.aliens img');
    firstAlien.classList.add('bounce');
}

// function is called when player is created + with every counterattack
function updateShipInfo() {
    let shipHealth = yourShip.hull;
    let hullColor;
    if (shipHealth >= 12) {
        hullColor = 'green';
    } else if (shipHealth <= 11 && shipHealth >= 6) {
        hullColor = 'orange';
    } else if (shipHealth < 6) {
        hullColor = 'red';
    }
    
    const shipSpan = document.createElement('span');
    shipSpan.textContent = shipHealth;
    shipSpan.className = hullColor;
    shipInfo.textContent = 'Current ship health: ';
    shipInfo.appendChild(shipSpan);
}

// game progress updates
function update(text) {
    gameUpdate.push(text);
    const msgEl = document.querySelectorAll('.msg');
    for (let i = 0; i < msgEl.length; i++) {
        msgEl[i].textContent = gameUpdate[i] || '';
    }
    gameProg.classList.add('fadeIn');
    gameProg.addEventListener('animationend', () => {
        gameProg.classList.remove('fadeIn');
    });
}

// reset game prog updates
function resetMsgs() {
    gameUpdate = [];
    const msgEl = document.querySelectorAll('.msg');
    for (let i = 0; i < msgEl.length; i++) {
        msgEl[i].textContent = '';
    }
}

// full restart of game
function restart() {
    displayMenu(true);
    intro.style.display = 'block';
    aliens.classList.remove('slideIn');
    playerStats.style.display = 'none';
    displayBtns(false);
    empty(earth);
    empty(aliens);
    empty(player);
    resetMsgs();
}

// initiates 'attack' on first alien/alien is removed if hull depleted/alien img blinks if alien injured/counterattack commences if alien exists/if no more aliens, player wins/if player hull depleted, player loses and game restarts

attackBtn.addEventListener('click', function (event) {
    resetMsgs();
    firstAlien = document.querySelector('.aliens img');
    const attack = yourShip.attack(alien[0]);
    if (attack) {
        update(`USS Assembly: Successful attack!`);
        if (alien[0].hull <= 0) {
            alien.shift();
            if (firstAlien) {
            firstAlien.remove();
            update(`Alien target eliminated.`)
            }
        }
    } else {
        update(`USS Assembly: Target missed.`)
    }
    if (alien[0]) {
            if (alien[0].hull === 1) {
                if (firstAlien) {
                    firstAlien.classList.add('red');
                }
    } counterAttack();
    }

    if (!alien[0]) {
        alert(`You have defeated the aliens and saved the world!`);
        restart();
    }
    if (yourShip.hull <= 0) {
        alert(`Mission failed. USS Assembly has been defeated and the aliens have taken over the universe.`);
        restart();
    }
})


function counterAttack() {
    firstAlien = document.querySelector('.aliens img');
    firstAlien.classList.add('bounce');
    let chance = Math.random();
    if (chance < alien[0].accuracy) {
        update('Alien counterattack: You have been hit!');
        yourShip.hull -= alien[0].firepower;
        updateShipInfo();
    } else if (chance > alien [0].accuracy) {
        update(`Alien counterattack unsuccessful; no damage to USS Assembly.`)
    }
}

retreatBtn.addEventListener('click', function(event) {
    yourShip.retreat();
})