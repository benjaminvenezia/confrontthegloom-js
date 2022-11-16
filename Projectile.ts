import { iProjectile, iGame } from "./typescript/interfaces";

class Projectile implements iProjectile {
  game: iGame;
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  damage: number;
  private markedForDeletion: boolean;

  constructor(game, ameliorationMenu, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = ameliorationMenu.getBulletSpeed();
    this.width = 15;
    this.height = 15;
    this.damage = ameliorationMenu.getPlayerDamage();
    this.markedForDeletion = false;
  }

  getMarkedForDeletion() {
    return this.markedForDeletion;
  }

  update() {
    this.x += this.speed;

    if (this.x > this.game.width) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
