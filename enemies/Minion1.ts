import { iGame } from "../typescript/interfaces";

class Minion1 extends Enemy {
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
    this.lives = 2;
    this.xp = this.lives;
    this.color = "green";
    this.type = "minion1";
    this.y = Math.random() * (game.height - this.height / 2);
  }
}
