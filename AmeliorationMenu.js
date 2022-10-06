/**
 * Cette classe centralise les valeurs influant sur le gameplay du joueur et les redistribue aux classes qui en ont besoins.
 */
class AmeliorationMenu {
  constructor(game) {
    this.game = game;

    //Gameplay value
    this.bulletSpeed = 2;
    this.bulletSpeedIncrement = 0.2;
    this.bulletSpeedCost = [2, 4, 6, 12, 33, 66];

    this.playerSpeed = 1;
    this.playerSpeedIncrement = 0.2;
    this.playerSpeedCost = [1, 3, 7, 14, 44, 55, 88, 199];

    this.playerDamage = 1;
    this.playerDamageIncrement = 0.1;
    this.playerDamageCost = [1, 3, 5, 7, 10, 12, 14, 18, 22, 25, 29];

    this.playerLife = 3;
    this.playerLifeIncrement = 1;
    this.playerLifeCost = [10, 12, 88, 120];

    //informations panel
    this.labelBulletSpeed = document.getElementById("label-bulletspeed");
    this.labelDamage = document.getElementById("label-damage");
    this.labelPlayerSpeed = document.getElementById("label-playerspeed");
    this.labelBulletSpeed.textContent = this.bulletSpeed.toFixed(1);
    this.labelDamage.textContent = this.playerDamage.toFixed(1);
    this.labelPlayerSpeed.textContent = this.playerSpeed.toFixed(1);

    this.xp = 50;

    // BULLETS
    this.btnBulletsSpeed = document.getElementById("bulletspeed");

    this.bulletSpeedIndex = 0;
    this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[this.bulletSpeedIndex]}`;
    this.btnBulletsSpeed.addEventListener("click", () => {
      this.updateBulletSpeed();
    });

    // PLAYER SPEED
    this.btnPlayerSpeed = document.getElementById("playerspeed");
    this.playerSpeedIndex = 0;
    this.btnPlayerSpeed.textContent = `cost : ${this.playerSpeedCost[this.playerSpeedIndex]}`;
    this.btnPlayerSpeed.addEventListener("click", () => {
      this.updatePlayerSpeed();
    });

    // PLAYER DAMAGE
    this.btnPlayerDamage = document.getElementById("playerdamage");
    this.playerDamageIndex = 0;
    this.btnPlayerDamage.textContent = `cost : ${this.playerDamageCost[this.playerDamageIndex]}`;
    this.btnPlayerDamage.addEventListener("click", () => {
      this.updatePlayerDamage();
    });

    // PLAYER LIFE
    this.btnPlayerLife = document.getElementById("playerlife");
    this.playerLifeIndex = 0;
    this.btnPlayerLife.textContent = `cost : ${this.playerLifeCost[this.playerLifeIndex]}`;
    this.btnPlayerLife.addEventListener("click", () => {
      this.updatePlayerLife();
    });
  }

  updateBulletSpeed() {
    if (this.game.getXp() - this.bulletSpeedCost[this.bulletSpeedIndex] >= 0 && this.bulletSpeedIndex < this.bulletSpeedCost.length) {
      this.game.setXp((this.xp -= this.bulletSpeedCost[this.bulletSpeedIndex]));
      this.bulletSpeed += this.bulletSpeedIncrement;
      this.bulletSpeedIndex++;

      this.labelBulletSpeed.textContent = this.bulletSpeed.toFixed(2);

      if (this.bulletSpeedIndex < this.bulletSpeedCost.length) {
        this.btnBulletsSpeed.textContent = `cost : ${this.bulletSpeedCost[this.bulletSpeedIndex]}`;
      } else {
        this.btnBulletsSpeed.textContent = `max`;
        this.btnBulletsSpeed.disabled = true;
      }
    }
  }

  updatePlayerSpeed() {
    if (this.game.getXp() - this.playerSpeedCost[this.playerSpeedIndex] >= 0 && this.playerSpeedIndex < this.playerSpeedCost.length) {
      this.game.setXp((this.xp -= this.playerSpeedCost[this.playerSpeedIndex]));
      this.playerSpeed += this.playerSpeedIncrement;
      this.playerSpeedIndex++;
      this.labelPlayerSpeed.textContent = this.playerSpeed.toFixed(1);

      if (this.playerSpeedIndex < this.playerSpeedCost.length) {
        this.btnPlayerSpeed.textContent = `cost : ${this.playerSpeedCost[this.playerSpeedIndex]}`;
      } else {
        this.btnPlayerSpeed.textContent = `max`;
        this.btnPlayerSpeed.disabled = true;
      }
    }
  }

  updatePlayerDamage() {
    if (this.game.getXp() - this.playerDamageCost[this.playerDamageIndex] >= 0 && this.playerDamageIndex < this.playerDamageCost.length) {
      this.game.setXp((this.xp -= this.playerDamageCost[this.playerDamageIndex]));
      this.playerDamage += this.playerDamageIncrement;
      this.playerDamageIndex++;

      this.labelDamage.textContent = this.playerDamage.toFixed(2);

      if (this.playerDamageIndex < this.playerDamageCost.length) {
        this.btnPlayerDamage.textContent = `cost : ${this.playerDamageCost[this.playerDamageIndex]}`;
      } else {
        this.btnPlayerDamage.textContent = `max`;
        this.btnPlayerDamage.disabled = true;
      }
    }
  }

  updatePlayerLife() {
    if (this.game.getXp() - this.playerLifeCost[this.playerLifeIndex] >= 0 && this.playerLifeIndex < this.playerLifeCost.length) {
      this.game.setXp((this.xp -= this.playerLifeCost[this.playerLifeIndex]));
      this.playerLife += this.playerLifeIncrement;
      this.playerLifeIndex++;
      if (this.playerLifeIndex < this.playerLifeCost.length) {
        this.btnPlayerLife.textContent = `cost : ${this.playerLifeCost[this.playerLifeIndex]}`;
      } else {
        this.btnPlayerLife.textContent = `max`;
        this.btnPlayerLife.disabled = true;
      }
    }
  }

  printInformationsPanel() {}

  getXp() {
    return this.xp;
  }

  getPlayerLife() {
    return this.playerLife;
  }

  setPlayerLife(newLifeValue) {
    this.playerLife = newLifeValue;
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

  getPlayerDamage() {
    return this.playerDamage;
  }
}
