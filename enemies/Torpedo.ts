class Torpedo extends Enemy {
  constructor(game) {
    super(game);
    this.width = 38;
    this.height = 29;
    this.lives = 10;
    this.color = "pink";
    this.type = "torpedo";
    this.xp = this.lives;
    this.y = Math.random() * (this.game.height - this.height / 2);
    this.x = this.game.width;
    this.angleInDegree = null;
    this.speedX = -0.9;
  }

  update() {
    this.setAngleInDegree();
    this.moveTorpedo();
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  setAngleInDegree() {
    const from = { x: this.x, y: this.y };
    const { x, y } = this.game.player.getCoords();
    const to = { x, y };

    const radianAngle = calculateAngle(from, to);
    this.angleInDegree = radianToDegree(radianAngle);
  }

  moveTorpedo() {
    const { x, y } = move({ x: this.x, y: this.y }, this.angleInDegree, this.speedX);
    this.x = x;
    this.y = y;
  }
}
