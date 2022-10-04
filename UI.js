class UI {
  constructor(game, ameliorationMenu) {
    this.game = game;
    this.ameliorationMenu = ameliorationMenu;
    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    this.color = "white";
  }

  printTimer(context) {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText("Timer: " + formattedTime, 20, 100);
  }

  printAmmo(context) {
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }
  }

  printLives(context) {
    for (let i = 0; i < this.game.player.lives; i++) {
      context.fillStyle = "red";
      context.fillRect(20 * i + 20, 5, 15, 15);
    }
  }

  printEndGameMessage(context) {
    if (this.game.player.lives === 0) {
      this.game.setGameOver(true);
      context.textAlign = "center";

      let message1 = "Tu as perdu...";
      let message2 = "Tu feras mieux la prochaine fois.";
      context.font = "50px " + this.fontFamily;
      context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
      context.font = "25px " + this.fontFamily;
      context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
    }
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.shadowColor = "black";
    context.font = this.fontSize + "px" + this.fontFamily;
    context.fillText("XP : " + this.game.xp, 20, 40);

    this.printTimer(context);
    this.printAmmo(context);
    this.printLives(context);
    this.printEndGameMessage(context);

    context.restore();
  }
}
