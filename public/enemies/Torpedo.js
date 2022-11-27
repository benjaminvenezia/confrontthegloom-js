"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torpedo extends Enemy {
    constructor(game) {
        super(game);
        this.width = 213;
        this.height = 169;
        this.lives = 10;
        this.type = "torpedo";
        this.xp = this.lives;
        this.y = Math.random() * (game.height - this.height / 2);
        this.x = game.width;
        this.frameX = 0;
        this.maxFrame = 37;
        this.angleInDegree = 0;
        this.speedX = -0.9;
        this.image = document.getElementById("torpedo");
        this.frameY = Math.floor(Math.random() * 3);
    }
    update() {
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
        this.setAngleInDegree();
        this.moveTorpedo();
        if (this.x + this.width < 0) {
            super.markedForDeletion = true;
        }
    }
    setAngleInDegree() {
        const from = { x: this.x, y: this.y };
        const { x, y } = this.game.getPlayer().getCoords();
        const to = { x, y };
        const radianAngle = calculateAngle(from, to);
        this.angleInDegree = radianToDegree(radianAngle);
    }
    moveTorpedo() {
        const { x, y } = move({ x: this.x, y: this.y }, this.angleInDegree, this.speedX);
        this.x = x;
        this.y = y;
    }
}
