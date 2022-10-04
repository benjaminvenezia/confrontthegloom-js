class AmeliorationMenu {
  constructor(game) {
    this.game = game;
    this.bulletSpeed = 2;
    this.playerSpeed = 2;
    this.btnBulletsSpeed = document.getElementById("bulletspeed");
    this.bulletSpeedCost = [1, 2, 3, 4, 5, 6];
    this.bulletSpeedIndex = 0;
    this.xp = 5;

    this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[0]}`;

    this.btnBulletsSpeed.addEventListener("click", () => {
      this.updateBulletSpeed();
    });
  }

  updateBulletSpeed() {
    if (this.game.getXp() - this.bulletSpeedCost[this.bulletSpeedIndex] >= 0 && this.bulletSpeedIndex < this.bulletSpeedCost.length - 1) {
      console.log(`achat! ${this.bulletSpeedCost[this.bulletSpeedIndex]} `);
      this.game.setXp((this.xp -= this.bulletSpeedCost[this.bulletSpeedIndex]));
      this.bulletSpeed++;
      this.bulletSpeedIndex++;
      this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[this.bulletSpeedIndex]}`;
    } else {
      console.log("pas assez d'argent");
    }
  }

  getXp() {
    return this.xp;
  }

  setXp(value) {
    this.xp = value;
  }

  getPlayerSpeed() {
    return this.playerSpeed;
  }

  getBulletSpeed() {
    return this.bulletSpeed;
  }
}
