const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

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
    }

    move(keys) {
        if (keys["ArrowLeft"]) this.velocityX = -5;
        if (keys["ArrowRight"]) this.velocityX = 5;
        if (keys["ArrowUp"]) this.velocityY = this.jumpPower;

        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Boundary control
        if (this.y > canvas.height - this.height) this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let keys = {};
let player1 = new Player(300, 500, "blue");
let player2 = new Player(500, 500, "red"); // Second player

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.move(keys);
    player2.move(keys);
    player1.draw();
    player2.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
