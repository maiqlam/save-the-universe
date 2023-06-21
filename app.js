
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
})

function empty(element) {
    element.textContent = '';
    element.innerHTML = '';
}
const player = document.createElement('h4');
function createPlayer() {
    let shipImg = document.createElement('img');
    shipImg.src = '/earthShip.png';
    earth.append(shipImg);
    player.textContent = `All aboard the USS Assembly with Captain ${playerName} to steer us to victory!`;
    playerInfo.prepend(player);
    return;
}

function createEnemy() {
    for (let i = 0; i < alien.length; i++) {
        let alienImg = document.createElement('img');
        alienImg.src = '/alien.png';
        aliens.append(alienImg);
    }
    aliens.classList.add('slideIn');
}

class Ship {
    constructor (hull, firepower, accuracy) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(enemy) {
        if (Math.random() < this.accuracy) {
            enemy.hull -= this.firepower;
            alert(`Successful attack!`);
        } else if (Math.random() > this.accuracy) {
            alert(`Target missed.`);
        };
    }
    retreat() {
        alert(`Are you sure?`);
        restart();
    }
}

function counterAttack() {
    if (Math.random() < alien[0].accuracy) {
        alert('Alien counterattack: You have been hit!');
        yourShip.hull -= alien[0].firepower;
    } else if (Math.random() > alien [0].accuracy) {
        alert(`Alien counterattack unsuccessful; no damage to USS Assembly.`)
    }
}

function restart() {
    showMenu();
    intro.style.display = 'block';
    aliens.classList.remove('slideIn');
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

let alien = [];

for (let i = 0; i < 6; i++) {
    alien[i] = new alienShip;
}


let yourShip = new earthShip;
let health = yourShip.hull;
shipInfo.textContent = `Current ship health: ${health}`
attackBtn.addEventListener('click', function (event) {
    yourShip.attack(alien[0]);
    if (alien[0].hull <= 0) {
        alien.shift();
    }
    counterAttack();
    if (yourShip.hull <= 0) {
        alert(`Mission failed. USS Assembly has been defeated.`)
    }
})

retreatBtn.addEventListener('click', function(event) {
    yourShip.retreat();
    playerStats.style.display = 'none';
    hideBtns();
    empty(earth);
    empty(aliens);
})
console.log(yourShip);
console.log(alien);