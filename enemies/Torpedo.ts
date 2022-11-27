import { iGame } from "../typescript/interfaces";

class Torpedo extends Enemy {
  private width: number;
  private height: number;
  private lives: number;
  private color: String;
  private type: String;
  private xp: number;
  private y: number;
  private gameX: number;
  private angleInDegree: number;
  private speedX: number;
  private image: HTMLElement | null;
  private frameY: number;
  private game: any;

  constructor(game: iGame) {
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
