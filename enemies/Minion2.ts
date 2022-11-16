import { iGame } from "../typescript/interfaces";

class Minion2 extends Enemy {
  private width: number;
  private height: number;
  private lives: number;
  private xp: number;
  private color: string;
  private type: string;
  private y: number;

  constructor(game: iGame) {
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
