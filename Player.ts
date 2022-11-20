import { iAmeliorationMenu, iGame, iPlayer, iProjectile } from "./typescript/interfaces";

class Player {
  game: iGame;
  width: number;
  ameliorationMenu: iAmeliorationMenu;
  height: number;
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  maxSpeed: number;
  projectiles: Array<iProjectile>;
  lives: number;
  markedForDeletion: boolean;
  image: any;
  frameX: number;
  frameY: number;
  maxFrame: number;

  constructor(game: iGame, ameliorationMenu: iAmeliorationMenu) {
    this.game = game;
    this.ameliorationMenu = ameliorationMenu;
    this.width = 45;
    this.height = 55;
    this.x = 20;
    this.y = 100;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 12;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = ameliorationMenu.getPlayerSpeed();
    this.projectiles = [];
    this.lives = ameliorationMenu.getPlayerLife();
    this.markedForDeletion = false;
    this.image = document.getElementById("player");
  }

  public update(): void {
    let py = this.y;
    let px = this.x;
    let gHeight = this.game.height;
    let gWidth = this.game.width;

    if ((this.game.getKeys().includes("ArrowUp") || this.game.getKeys().includes("w") || this.game.getKeys().includes("W")) && py > 0) {
      this.speedY = -this.maxSpeed;
      this.game.getSound().startGameAudio();
    } else if (
      (this.game.getKeys().includes("ArrowDown") || this.game.getKeys().includes("s") || this.game.getKeys().includes("S")) &&
      py < gHeight - this.height
    ) {
      this.speedY = this.maxSpeed;
      this.game.getSound().startGameAudio();
    } else if (
      (this.game.getKeys().includes("ArrowRight") || this.game.getKeys().includes("d") || this.game.getKeys().includes("D")) &&
      px < gWidth - 50
    ) {
      this.speedX = this.maxSpeed;
      this.game.getSound().startGameAudio();
    } else if (
      (this.game.getKeys().includes("ArrowLeft") || this.game.getKeys().includes("a") || this.game.getKeys().includes("A")) &&
      px > 0
    ) {
      this.speedX = -this.maxSpeed;
      this.game.getSound().startGameAudio();
    } else {
      this.speedY = 0;
      this.speedX = 0;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    this.maxSpeed = this.ameliorationMenu.getPlayerSpeed();
    this.lives = this.ameliorationMenu.getPlayerLife();

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter((projectile) => !projectile.getMarkedForDeletion());

    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeRect(this.x, this.y, this.width, this.height);

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  public getMarkedForDeletion(): boolean {
    return this.markedForDeletion;
  }

  public setMarkedForDeletion(setter: boolean) {
    this.markedForDeletion = setter;
  }

  public setLife(newLive: number): void {
    this.lives = newLive;
  }

  public getLife(): number {
    return this.lives;
  }

  public getCoords(): object {
    const coords = { x: this.x, y: this.y };
    return coords;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWidth(): number {
    return this.width;
  }

  public shootTop(): void {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.ameliorationMenu, this.x + 40, this.y + 22.5));
      this.game.ammo--;
    }
  }
}
