import { iGame } from "../typescript/interfaces";

class Enemy {
  private game: iGame;
  private x: number;
  private width: number;
  private speedX: number;
  private markedForDeletion: boolean;
  private color: string;

  constructor(game: iGame) {
    this.game = game;
    this.x = this.game.width;
    this.width = 0;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    this.color = "red";
  }

  update() {
    this.x += this.speedX;
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "black";
    context.font = "20px helvetica";
    context.fillText(this.lives, this.x, this.y);
  }
}
