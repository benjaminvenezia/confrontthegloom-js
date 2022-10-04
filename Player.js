class Player {
  constructor(game) {
    this.game = game;
    this.width = 60;
    this.height = 90;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.projectiles = [];
    this.lives = 3;
  }

  update() {
    if (this.game.keys.includes("ArrowUp") && this.game.player.y > 0) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("ArrowDown") && this.game.player.y < this.game.height - this.game.player.height) {
      this.speedY = this.maxSpeed;
    } else if (this.game.keys.includes("ArrowRight")) {
      this.speedX = this.maxSpeed;
    } else if (this.game.keys.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeed;
    } else {
      this.speedY = 0;
      this.speedX = 0;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.x + 40, this.y + 50));
      this.game.ammo--;
    }
  }
}
