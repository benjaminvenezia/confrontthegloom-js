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
    }
}
