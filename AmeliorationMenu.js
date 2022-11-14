/**
 * Cette classe centralise les valeurs influant sur le gameplay du joueur et les redistribue aux classes qui en ont besoins.
 */
class AmeliorationMenu {
  constructor(game) {
    this.game = game;

    //Gameplay value
    this.bulletSpeed = 2;
    this.bulletSpeedIncrement = 0.05;
    this.bulletSpeedCost = this.generateArrayCost(4, 3);

    this.playerSpeed = 1;
    this.playerSpeedIncrement = 0.05;
    this.playerSpeedCost = this.generateArrayCost(60, 3);

    this.playerDamage = 1;
    this.playerDamageIncrement = 0.05;
    this.playerDamageCost = this.generateArrayCost(60, 3);

    this.playerLife = 3;
    this.playerLifeIncrement = 1;
    this.playerLifeCost = this.generateArrayCost(60, 20);

    this.initialEnemyInterval = 2000;
    this.difficultyInterval = 5000;
    this.enemyIntervalDecrement = 50;

    //informations panel
    this.labelBulletSpeed = document.getElementById("label-bulletspeed");
    this.labelDamage = document.getElementById("label-damage");
    this.labelPlayerSpeed = document.getElementById("label-playerspeed");
    this.labelApparition = document.getElementById("label-apparition");
    this.labelBulletSpeed.textContent = this.bulletSpeed.toFixed(1);
    this.labelDamage.textContent = this.playerDamage.toFixed(1);
    this.labelPlayerSpeed.textContent = this.playerSpeed.toFixed(1);
    this.labelApparition.textContent = this.initialEnemyInterval.toFixed(1);
    // XP
    this.xp = 100;

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

      this.disableButtonWhenMaximumAmeliorationCostIsReached(this.bulletSpeedIndex, this.bulletSpeedCost, this.btnBulletsSpeed);
    }
  }

  updatePlayerSpeed() {
    if (this.game.getXp() - this.playerSpeedCost[this.playerSpeedIndex] >= 0 && this.playerSpeedIndex < this.playerSpeedCost.length) {
      this.game.setXp((this.xp -= this.playerSpeedCost[this.playerSpeedIndex]));
      this.playerSpeed += this.playerSpeedIncrement;
      this.playerSpeedIndex++;
      this.labelPlayerSpeed.textContent = this.playerSpeed.toFixed(1);

      this.disableButtonWhenMaximumAmeliorationCostIsReached(this.playerSpeedIndex, this.playerSpeedCost, this.btnPlayerSpeed);
    }
  }

  updatePlayerDamage() {
    if (this.game.getXp() - this.playerDamageCost[this.playerDamageIndex] >= 0 && this.playerDamageIndex < this.playerDamageCost.length) {
      this.game.setXp((this.xp -= this.playerDamageCost[this.playerDamageIndex]));
      this.playerDamage += this.playerDamageIncrement;
      this.playerDamageIndex++;

      this.labelDamage.textContent = this.playerDamage.toFixed(2);

      this.disableButtonWhenMaximumAmeliorationCostIsReached(this.playerDamageIndex, this.playerDamageCost, this.btnPlayerDamage);
    }
  }

  updatePlayerLife() {
    if (this.game.getXp() - this.playerLifeCost[this.playerLifeIndex] >= 0 && this.playerLifeIndex < this.playerLifeCost.length) {
      this.game.setXp((this.xp -= this.playerLifeCost[this.playerLifeIndex]));
      this.playerLife += this.playerLifeIncrement;
      this.playerLifeIndex++;

      this.disableButtonWhenMaximumAmeliorationCostIsReached(this.playerLifeIndex, this.playerLifeCost, this.btnPlayerLife);
    }
  }

  disableButtonWhenMaximumAmeliorationCostIsReached(counterIndex, arrayCost, btnToDisable) {
    if (counterIndex < arrayCost.length) {
      btnToDisable.textContent = `cost : ${arrayCost[counterIndex]}`;
    } else {
      btnToDisable.textContent = `max`;
      btnToDisable.disabled = true;
    }
  }

  generateArrayCost(n, valueStep) {
    let arr = [];

    for (let i = 1, j = 1; i <= n; i++, j += valueStep) {
      arr.push(j);
    }

    return arr;
  }

  getXp() {
    return this.xp;
  }

  getInitialEnemyInterval() {
    return this.initialEnemyInterval;
  }

  getDifficultyInterval() {
    return this.difficultyInterval;
  }

  getEnemyIntervalDecrement() {
    return this.enemyIntervalDecrement;
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

  // this function is called by Game each decrement of time.
  updateMobsApparitionForPrinting(updatedInitialApparition) {
    this.labelApparition.textContent = updatedInitialApparition.toFixed(1);
  }
}
