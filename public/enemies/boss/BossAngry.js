"use strict";
class BossAngry extends Enemy {
    constructor(game) {
        super(game);
        this.width = 350;
        this.height = 470;
        this.lives = 12;
        this.speedX = -0.1;
        this.color = "purple";
        this.type = "boss";
        this.xp = this.lives;
        this.y = 10;
    }
}
