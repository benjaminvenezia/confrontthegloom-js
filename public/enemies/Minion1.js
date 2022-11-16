"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minion1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 58;
        this.height = 69;
        this.lives = 2;
        this.xp = this.lives;
        this.color = "green";
        this.type = "minion1";
        this.y = Math.random() * (game.height - this.height / 2);
    }
}
