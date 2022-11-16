"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(game, ameliorationMenu) {
        this.game = game;
        this.ameliorationMenu = ameliorationMenu;
        this.width = 45;
        this.height = 55;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.speedX = 0;
        this.maxSpeed = ameliorationMenu.getPlayerSpeed();
        this.projectiles = [];
        this.lives = ameliorationMenu.getPlayerLife();
    }
    update() {
        let py = this.y;
        let px = this.x;
        let gHeight = this.game.height;
        let gWidth = this.game.width;
        if ((this.game.getKeys().includes("ArrowUp") || this.game.getKeys().includes("w") || this.game.getKeys().includes("W")) && py > 0) {
            this.speedY = -this.maxSpeed;
            this.game.getSound().startGameAudio();
        }
        else if ((this.game.getKeys().includes("ArrowDown") || this.game.getKeys().includes("s") || this.game.getKeys().includes("S")) &&
            py < gHeight - this.height) {
            this.speedY = this.maxSpeed;
            this.game.getSound().startGameAudio();
        }
        else if ((this.game.getKeys().includes("ArrowRight") || this.game.getKeys().includes("d") || this.game.getKeys().includes("D")) &&
            px < gWidth - 50) {
            this.speedX = this.maxSpeed;
            this.game.getSound().startGameAudio();
        }
        else if ((this.game.getKeys().includes("ArrowLeft") || this.game.getKeys().includes("a") || this.game.getKeys().includes("A")) &&
            px > 0) {
            this.speedX = -this.maxSpeed;
            this.game.getSound().startGameAudio();
        }
        else {
            this.speedY = 0;
            this.speedX = 0;
        }
        this.y += this.speedY;
        this.x += this.speedX;
        this.maxSpeed = this.ameliorationMenu.getPlayerSpeed();
        this.lives = this.ameliorationMenu.getPlayerLife();
        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
        this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
    }
    draw(context) {
        context.fillStyle = "orange";
        context.fillRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach((projectile) => {
            projectile.draw(context);
        });
    }
    setLife(newLive) {
        this.lives = newLive;
    }
    getCoords() {
        const coords = { x: this.x, y: this.y };
        return coords;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.ameliorationMenu, this.x + 40, this.y + 22.5));
            this.game.ammo--;
        }
    }
}
