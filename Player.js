class Player {
  constructor(game, ameliorationMenu) {
    this.game = game;
    this.ameliorationMenu = ameliorationMenu;
    this.width = 45;
    this.height = 55;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = ameliorationMenu.getPlayerSpeed();
    this.projectiles = [];
    this.lives = ameliorationMenu.getPlayerLife();
  }

  update() {
    let py = this.game.player.y;
    let px = this.game.player.x;
    let gHeight = this.game.height;
    let gWidth = this.game.width;

    if ((this.game.keys.includes("ArrowUp") || this.game.keys.includes("w") || this.game.keys.includes("W")) && py > 0) {
      this.speedY = -this.maxSpeed;
      this.game.sound.startGameAudio(false);
    } else if (
      (this.game.keys.includes("ArrowDown") || this.game.keys.includes("s") || this.game.keys.includes("S")) &&
      py < gHeight - this.game.player.height
    ) {
      this.speedY = this.maxSpeed;
      this.game.sound.startGameAudio(false);
    } else if (
      (this.game.keys.includes("ArrowRight") || this.game.keys.includes("d") || this.game.keys.includes("D")) &&
      px < gWidth - 50
    ) {
      this.speedX = this.maxSpeed;
      this.game.sound.startGameAudio(false);
    } else if ((this.game.keys.includes("ArrowLeft") || this.game.keys.includes("a") || this.game.keys.includes("A")) && px > 0) {
      this.speedX = -this.maxSpeed;
      this.game.sound.startGameAudio(false);
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

    this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
  }

  draw(context) {
    context.fillStyle = "orange";
    context.fillRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  setLife(newLive) {
    this.lives = newLive;
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(new Projectile(this.game, this.ameliorationMenu, this.x + 40, this.y + 22.5));
      this.game.ammo--;
    }
  }
}
