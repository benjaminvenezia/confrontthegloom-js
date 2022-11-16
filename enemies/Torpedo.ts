import { iGame } from "../typescript/interfaces";

class Torpedo extends Enemy {
  private width: number;
  private height: number;
  private lives: number;
  private color: String;
  private type: String;
  private xp: number;
  private y: number;
  private x: number;
  private angleInDegree: number;
  private speedX: number;

  constructor(game: iGame) {
    super(game);
    this.width = 38;
    this.height = 29;
    this.lives = 10;
    this.color = "pink";
    this.type = "torpedo";
    this.xp = this.lives;
    this.y = Math.random() * (game.height - this.height / 2);
    this.x = game.width;
    this.angleInDegree = 0;
    this.speedX = -0.9;
  }

  update() {
    this.setAngleInDegree();
    this.moveTorpedo();
    if (this.x + this.width < 0) {
      super.markedForDeletion = true;
    }
  }

  setAngleInDegree() {
    const from = { x: this.x, y: this.y };
    const { x, y } = super.game.player.getCoords();
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
