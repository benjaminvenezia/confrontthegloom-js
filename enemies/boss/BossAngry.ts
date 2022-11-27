class BossAngry extends Enemy {
  constructor(game) {
    super(game);
    this.width = 350;
    this.height = 470;
    this.lives = 12;
    this.speedX = -0.4;
    this.type = "boss";
    this.xp = this.lives;
    this.y = 10;
    this.image = document.getElementById("boss");
    this.frameY = 0;
    this.frameX = 1;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    context.font = "20px helvetica";
    context.fillText(this.lives, this.x, this.y);
  }
}
