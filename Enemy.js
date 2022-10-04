class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
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

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "black";
    context.font = "20px helvetica";
    context.fillText(this.lives, this.x, this.y);
  }
}
