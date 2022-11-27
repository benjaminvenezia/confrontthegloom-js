import { iProjectile, iGame, iAmeliorationMenu } from "./typescript/interfaces";

class Projectile {
  private game: iGame;
  private x: number;
  private y: number;
  private speed: number;
  private width: number;
  private height: number;
  private damage: number;
  private markedForDeletion: boolean;
  private image: HTMLElement | null;

  constructor(game: iGame, ameliorationMenu: iAmeliorationMenu, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = ameliorationMenu.getBulletSpeed();
    this.width = 15;
    this.height = 15;
    this.damage = ameliorationMenu.getPlayerDamage();
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
  }

  public getMarkedForDeletion(): boolean {
    return this.markedForDeletion;
  }

  public getDamage(): number {
    return this.damage;
  }

  public update(): void {
    this.x += this.speed;

    if (this.x > this.game.width) {
      this.markedForDeletion = true;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    // context.fillStyle = "yellow";
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x, this.y);
  }
}
