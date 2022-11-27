"use strict";
class WaveOfDespair extends Enemy {
    constructor(game) {
        super(game);
        this.width = game.width * 2;
        this.height = 200;
        this.lives = 2000;
        this.speedX = Math.random() * -2.5 - 1.5;
        this.color = "black";
        this.type = "wave";
        this.xp = this.lives;
        this.y = Math.random() * (this.game.height - this.height / 2);
        this.image = document.getElementById("wave");
        this.frameY = 0;
        this.frameX = 1;
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        context.font = "20px helvetica";
        context.fillText(this.lives, this.x, this.y);
    }
}
