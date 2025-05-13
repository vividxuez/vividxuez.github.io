class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 30;
        this.height = 30;
    }

    draw() {
        ctx.fillStyle = this.type === "speed" ? "green" : this.type === "mine" ? "red" : "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let powerUps = [];

function spawnPowerUp() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * (canvas.height - 100);
    let types = ["speed", "mine", "slow"];
    let type = types[Math.floor(Math.random() * types.length)];
    powerUps.push(new PowerUp(x, y, type));
}

setInterval(spawnPowerUp, 5000); // Power-ups appear every 5 sec

function drawPowerUps() {
    powerUps.forEach(powerUp => powerUp.draw());
}
