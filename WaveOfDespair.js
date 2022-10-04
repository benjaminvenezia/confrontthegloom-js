class WaveOfDespair extends Enemy {
  constructor(game) {
    super(game);
    this.width = 400;
    this.height = 300;
    this.lives = 2000;
    this.color = "black";
    this.xp = this.lives;
    this.y = Math.random() * (this.game.height - this.height / 2);
  }
}
