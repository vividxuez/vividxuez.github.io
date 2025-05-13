class Obstacle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let obstacles = [];

function spawnObstacle() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * (canvas.height - 100);
    let width = 50;
    let height = 50;
    obstacles.push(new Obstacle(x, y, width, height, "black"));
}

setInterval(spawnObstacle, 3000); // Spawn new obstacles every 3 sec

function drawObstacles() {
    obstacles.forEach(obstacle => obstacle.draw());
}
