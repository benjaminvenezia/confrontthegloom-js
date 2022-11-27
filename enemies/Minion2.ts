import { iGame } from "../typescript/interfaces";

class Minion2 extends Enemy {
  private width: number;
  private height: number;
  private lives: number;
  private xp: number;
  private type: string;
  private y: number;
  private image: HTMLElement | null;
  private frameY: number;

  constructor(game: iGame) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.lives = 4;
    this.type = "minion2";
    this.xp = this.lives;
    this.y = Math.random() * (game.height - this.height / 2);
    this.image = document.getElementById("minion1");
    this.frameY = Math.floor(Math.random() * 3);
  }
}
