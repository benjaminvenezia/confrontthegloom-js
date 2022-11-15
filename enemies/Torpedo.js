class Torpedo extends Enemy {
  constructor(game) {
    super(game);
    this.width = 58;
    this.height = 69;
    this.lives = 4;
    this.color = "pink";
    this.type = "torpedo";
    this.xp = this.lives;
    this.y = Math.random() * (this.game.height - this.height / 2);
    this.x = this.game.width;
  }
}
