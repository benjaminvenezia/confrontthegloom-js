import { iGame } from "../typescript/interfaces";

class Torpedo extends Enemy {
  private width: number;
  private height: number;
  private lives: number;
  private type: String;
  private xp: number;
  private y: number;
  private x: number;
  private angleInDegree: number;
  private speedX: number;
  private image: HTMLElement | null;
  frameY: number;

  constructor(game: iGame) {
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
    } else {
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
