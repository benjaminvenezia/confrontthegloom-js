"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Projectile {
    constructor(game, ameliorationMenu, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = ameliorationMenu.getBulletSpeed();
        this.width = 15;
        this.height = 15;
        this.damage = ameliorationMenu.getPlayerDamage();
        this.markedForDeletion = false;
    }
    getMarkedForDeletion() {
        return this.markedForDeletion;
    }
    update() {
        this.x += this.speed;
        if (this.x > this.game.width) {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
