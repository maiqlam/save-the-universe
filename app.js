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

let playerName;
let alienImg;
let alien = [];
let firstAlien;
const player = document.createElement('h4');
let yourShip;

// menu display
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

// game interaction buttons display
function showBtns() {
    attackBtn.style.display = 'block';
    retreatBtn.style.display = 'block';
}

function hideBtns() {
    attackBtn.style.display = 'none';
    retreatBtn.style.display = 'none';
}

// start button - asks for player name; if null, default name is Patchy
// shows menu unless player clicks 'cancel'
startBtn.addEventListener('click', function(event) {
    playerName = prompt("Enter your player name to begin.");
    if (playerName === '') {
        alert(`Name cannot be blank. No name, no game!`)
    } 
    if (playerName) {
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

// 'prepare for battle' - hides starter menu, creates player and enemy (removes previous player stats if any)
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

let gameUpdate = [];

function update(text) {
    gameUpdate.push(text);
    // if (gameUpdate.length > 4) {
    //     gameUpdate.shift();
    // }
    const msgEl = document.querySelectorAll('.msg');
    for (let i = 0; i < msgEl.length; i++) {
        msgEl[i].textContent = gameUpdate[i] || '';
    }
}

function resetMsgs() {
    gameUpdate = [];
    const msgEl = document.querySelectorAll('.msg');
    for (let i = 0; i < msgEl.length; i++) {
        msgEl[i].textContent = '';
    }
}

// initiates attack method from Ship class; if first alien (alien[0]) is defeated, remove alien from array. if first alien has remaining hull, alien will counterattack. if no aliens remaining, player wins and game restarts. if player ship hull depleted, player loses and game restarts.
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
    resetMsgs();
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