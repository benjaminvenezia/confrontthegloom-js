"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minion2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 58;
        this.height = 69;
        this.lives = 4;
        this.color = "blue";
        this.type = "minion2";
        this.xp = this.lives;
        this.y = Math.random() * (game.height - this.height / 2);
    }
}
