"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Minion1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.lives = 2;
        this.xp = this.lives;
        this.type = "minion1";
        this.y = Math.random() * (game.height - this.height / 2);
        this.image = document.getElementById("minion1");
        this.frameY = Math.floor(Math.random() * 3);
    }
}
