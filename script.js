const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let players = [];
let botsEnabled = false;

class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = color;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.jumpPower = -10;
        this.bot = false;
    }

    move(keys) {
        if (!this.bot) {
            if (keys["ArrowLeft"]) this.velocityX = -5;
            if (keys["ArrowRight"]) this.velocityX = 5;
            if (keys["ArrowUp"]) this.velocityY = this.jumpPower;
        } else {
            // Simple bot AI
            if (Math.random() > 0.5) this.velocityX = Math.random() > 0.5 ? -5 : 5;
            if (Math.random() > 0.9) this.velocityY = this.jumpPower;
        }

        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.y > canvas.height - this.height) this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

function startGame(playerCount) {
    players = [];
    let colors = ["blue", "red", "green", "yellow"];
    for (let i = 0; i < playerCount; i++) {
        players.push(new Player(100 + i * 150, 500, colors[i]));
    }
    gameLoop();
}

function toggleBots() {
    botsEnabled = !botsEnabled;
    players.forEach(player => player.bot = botsEnabled);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    players.forEach(player => {
        player.move(keys);
        player.draw();
    });
    requestAnimationFrame(gameLoop);
}
