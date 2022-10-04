class AmeliorationMenu {
  constructor(game) {
    this.bulletSpeed = 2;
    this.playerSpeed = 2;
    this.game = game;
    this.btnBulletsSpeed = document.getElementById("bulletspeed");
    this.bulletSpeedCost = [1, 2, 3, 4, 5, 6];
    this.bulletSpeedIndex = 0;
    this.xp = 5;

    this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[0]}`;

    this.btnBulletsSpeed.addEventListener("click", () => {
      if (this.game.getXp() - this.bulletSpeedCost[this.bulletSpeedIndex] >= 0 && this.bulletSpeedIndex < this.bulletSpeedCost.length - 1) {
        this.game.setXp(this.xp - this.bulletSpeedCost[this.bulletSpeedIndex]);
        this.bulletSpeed++;
        this.bulletSpeedIndex++;
        this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[this.bulletSpeedIndex]}`;
      }
    });
  }

  getXp() {
    return this.xp;
  }

  getPlayerSpeed() {
    return this.playerSpeed;
  }

  getBulletSpeed() {
    return this.bulletSpeed;
  }
}
