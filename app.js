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

let playerName;

function showMenu() {
    proceedBtn.style.display = 'block';
    startOver.style.display = 'block';  
    welcomeMsg.style.display = 'block'; 
}

function hideMenu() {
    proceedBtn.style.display = 'none';
    startOver.style.display = 'none';
    welcomeMsg.style.display = 'none';
}

function showBtns() {
    attackBtn.style.display = 'block';
    retreatBtn.style.display = 'block';
}

function hideBtns() {
    attackBtn.style.display = 'none';
    retreatBtn.style.display = 'none';
}

startBtn.addEventListener('click', function(event) {
    playerName = prompt("Enter your player name to begin.");

    if (playerName === '') {
        playerName = 'Patchy';
        showMenu();
        startBtn.style.display = 'none';
        welcomeMsg.innerText = `Welcome, ${playerName}! Are you ready to save the universe?`;
        } 
    else if (playerName) {
        showMenu();
        startBtn.style.display = 'none';
        welcomeMsg.innerText = `Welcome, ${playerName}! Are you ready to save the universe?`;
    }
     else {
        hideMenu();
    }
})

startOver.addEventListener('click', function(event) {
    startBtn.style.display = 'block';
    hideMenu();
    empty(earth);
    empty(aliens);
})

proceedBtn.addEventListener('click', function(event) {
    startBtn.style.display = 'none';
    hideMenu();
    intro.style.display = 'none';
    playerStats.style.display = 'flex';
    showBtns();
    empty(player);
    createPlayer();
    createEnemy();
    console.log(yourShip);
    console.log(alien);
})

function empty(element) {
    element.textContent = '';
    element.innerHTML = '';
}
const player = document.createElement('h4');
let yourShip;
function updateShipInfo() {
    shipInfo.textContent = `Current ship health: ${yourShip.hull}`;
}
function createPlayer() {
    yourShip = new earthShip;
    let shipImg = document.createElement('img');
    shipImg.src = '/earthShip.png';
    earth.append(shipImg);
    player.textContent = `All aboard the USS Assembly with Captain ${playerName} to steer us to victory!`;
    playerInfo.prepend(player);
    updateShipInfo();
}

let alienImg;

let alien = [];
let firstAlien;

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
            alert(`Successful attack!`);
        } else if (chance > this.accuracy) {
            alert(`Target missed.`);
        };
    }
    retreat() {
        alert(`Are you sure?`);
        restart();
    }
}

attackBtn.addEventListener('click', function (event) {
    firstAlien = document.querySelector('.aliens img');
    yourShip.attack(alien[0]);
    if (alien[0].hull <= 0) {
        alien.shift();
        if (firstAlien) {
            firstAlien.remove();
        }
    }
    if (alien[0]) {
        counterAttack();
    }
    if (!alien[0]) {
        alert(`You have defeated the aliens and saved the universe!`);
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
        alert('Alien counterattack: You have been hit!');
        yourShip.hull -= alien[0].firepower;
        updateShipInfo();
    } else if (chance > alien [0].accuracy) {
        alert(`Alien counterattack unsuccessful; no damage to USS Assembly.`)
    }
    console.log(yourShip);
    console.log(alien);
}

function restart() {
    showMenu();
    intro.style.display = 'block';
    aliens.classList.remove('slideIn');
    playerStats.style.display = 'none';
    hideBtns();
    empty(earth);
    empty(aliens);
    empty(player);
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

retreatBtn.addEventListener('click', function(event) {
    yourShip.retreat();
})