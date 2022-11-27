"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torpedo extends Enemy {
    constructor(game) {
        super(game);
        this.width = 213;
        this.height = 165;
        this.lives = 10;
        this.color = "pink";
        this.type = "torpedo";
        this.xp = this.lives;
        this.y = Math.random() * (game.height - this.height / 2);
        this.gameX = game.width;
        this.angleInDegree = 0;
        this.speedX = -0.9;
        this.image = document.getElementById("torpedo");
        this.frameY = Math.floor(Math.random() * 3);
    }
    update() {
        this.setAngleInDegree();
        this.moveTorpedo();
        if (this.gameX + this.width < 0) {
            super.markedForDeletion = true;
        }
    }
    setAngleInDegree() {
        const from = { x: this.gameX, y: this.y };
        const { x, y } = this.game.getPlayer().getCoords();
        const to = { x, y };
        const radianAngle = calculateAngle(from, to);
        this.angleInDegree = radianToDegree(radianAngle);
    }
    moveTorpedo() {
        const { x, y } = move({ x: this.gameX, y: this.y }, this.angleInDegree, this.speedX);
        this.gameX = x;
        this.y = y;
    }
}
