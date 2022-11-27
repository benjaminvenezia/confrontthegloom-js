"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.width = 0;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.image = document.getElementById("minion1");
    }
    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        context.font = "20px helvetica";
        context.fillText(this.lives, this.x, this.y);
    }
}
