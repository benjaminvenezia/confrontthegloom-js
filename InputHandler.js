class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "w" ||
          e.key === "a" ||
          e.key === "s" ||
          e.key === "d" ||
          e.key === "W" ||
          e.key === "A" ||
          e.key === "S" ||
          e.key === "D") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        console.log(this.game.keys);
        this.game.keys.push(e.key);
      } else if (e.key === " ") {
        this.game.player.shootTop();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        console.log(this.game.keys);

        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}
