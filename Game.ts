import { iAmeliorationMenu, iEnemy, iGame, iInputHandler, iPlayer, iSound, iUI } from "./typescript/interfaces";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Particle {}

  class Game {
    width: number;
    height: number;
    background: object;
    sound: iSound;
    ameliorationMenu: iAmeliorationMenu;
    player: iPlayer;
    input: iInputHandler;
    ui: iUI;
    keys: Array<string>;
    enemies: Array<iEnemy>;
    enemyTimer: number;
    initialEnemyInterval: number;
    ammo: number;
    maxAmmo: number;
    ammoTimer: number;
    ammoInterval: number;
    gameOver: boolean;
    xp: number;
    gameTime: number;
    bossActivation: boolean;
    bossAngryArrived: boolean;
    difficultyTimer: number;
    difficultyInterval: number;
    enemyIntervalDecrement: number;
    speed: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.background = new Background(this);
      this.sound = new Sound();
      this.ameliorationMenu = new AmeliorationMenu(this);
      this.player = new Player(this, this.ameliorationMenu);
      this.input = new InputHandler(this);
      this.ui = new UI(this, this.ameliorationMenu);
      this.keys = [];
      this.enemies = [];
      this.enemyTimer = 0;
      //fréquence initiale d'apparition des ennemis
      this.initialEnemyInterval = this.ameliorationMenu.getInitialEnemyInterval();
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 500;
      this.gameOver = false;
      this.xp = this.ameliorationMenu.getXp();
      this.gameTime = 0;
      this.bossActivation = false;
      this.bossAngryArrived = false;
      this.speed = 1;

      this.difficultyTimer = 0;
      //Toutes les X secondes, on effectue le décrément
      this.difficultyInterval = this.ameliorationMenu.getDifficultyInterval();
      //durée à décrémenter à chaque événement de diminution du temps
      this.enemyIntervalDecrement = this.ameliorationMenu.getEnemyIntervalDecrement();
    }

    public getSound(): iSound {
      return this.sound;
    }

    public getPlayer(): iPlayer {
      return this.player;
    }

    getKeys(): Array<String> {
      return this.keys;
    }

    setXp(newXp: number): void {
      this.xp = newXp;
    }

    getXp(): number {
      return this.xp;
    }

    setGameOver(bool: boolean): void {
      this.gameOver = bool;
    }

    getGameOver(): boolean {
      return this.gameOver;
    }

    getGameTime(): number {
      return this.gameTime;
    }

    getFormattedTime(gameTime: number): String {
      return (this.gameTime * 0.001).toFixed(1);
    }

    updateEnemiesDifficulty(deltaTime: number): void {
      const minimumIntervalTimeInMs = 300;

      if (this.difficultyTimer > this.difficultyInterval && this.initialEnemyInterval > minimumIntervalTimeInMs) {
        this.initialEnemyInterval -= this.enemyIntervalDecrement;
        this.difficultyTimer = 0;
        this.ameliorationMenu.updateMobsApparitionForPrinting(this.initialEnemyInterval);
      } else {
        this.difficultyTimer += deltaTime;
      }
    }

    // UPDATE
    update(deltaTime: number) {
      if (!this.gameOver) {
        this.updateEnemiesDifficulty(deltaTime);
        this.gameTime += deltaTime;
      }

      if (this.player.getLife() === 0) {
        this.player.setMarkedForDeletion(true);
      }
      this.background.update();
      this.background.layer4.update();

      this.player.update();

      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) {
          this.ammo++;
        }

        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => {
        enemy.update();

        if (checkCollision(this.player, enemy)) {
          if (enemy.type === "wave" || enemy.type === "boss") {
            this.player.setMarkedForDeletion(true);
            this.setGameOver(true);
          }

          this.sound.contactWithEnnemySound();
          enemy.markedForDeletion = true;

          let playerLife = this.ameliorationMenu.getPlayerLife();
          this.ameliorationMenu.setPlayerLife((playerLife -= 1));
          this.player.setLife((this.player.lives -= 1));
        }

        this.player.projectiles.forEach((projectile) => {
          if (checkCollision(projectile, enemy)) {
            enemy.lives -= projectile.damage;
            projectile.markedForDeletion = true;

            if (enemy.lives <= 0) {
              if (enemy.type === "boss") {
                this.bossActivation = false;
              }

              enemy.markedForDeletion = true;
              this.ameliorationMenu.setXp((this.xp += enemy.xp));
            }
          }
        });
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      if (this.enemyTimer > this.initialEnemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }

    draw(context: CanvasRenderingContext2D) {
      this.background.draw(context);

      if (!this.player.getMarkedForDeletion()) {
        this.player.draw(context);
      }
      this.ui.draw(context);

      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });

      this.background.layer4.draw(context);
    }

    invokeSpecialEnemy() {
      const numberToEnableWaveOfDespair = 10;
      const numberToEnableTorpedo = 25;
      const randomNumber = getRandomNumber(1, 40);
      let isAlreadyAWave = false;

      //one waveofdespair at the same time only!
      isAlreadyAWave = this.enemies.some((e) => e.type === "wave");

      if (randomNumber === numberToEnableWaveOfDespair && !this.bossActivation && !isAlreadyAWave) {
        this.enemies.push(new WaveOfDespair(this));
      }

      if (randomNumber === numberToEnableTorpedo && !this.bossActivation) {
        this.enemies.push(new Torpedo(this));
      }
    }

    getBossAngryArrived() {
      return this.bossAngryArrived;
    }

    getBossActivation() {
      return this.bossActivation;
    }

    addEnemy() {
      const minion1TimeMax = 5;
      const minion2TimeMax = 10;
      const minion3TimeMax = 100;

      this.invokeSpecialEnemy();

      if (this.getFormattedTime(this.gameTime) < minion1TimeMax) {
        this.enemies.push(new Minion1(this));
      } else if (this.getFormattedTime(this.gameTime) < minion2TimeMax) {
        this.enemies.push(new Minion2(this));
      } else if (this.getFormattedTime(this.gameTime) >= minion2TimeMax && !this.bossAngryArrived) {
        this.bossAngryArrived = true;
        this.bossActivation = true;
        this.enemies.push(new BossAngry(this));
      } else if (this.getFormattedTime(this.gameTime) < minion3TimeMax && !this.bossActivation) {
        this.enemies.push(new Minion2(this));
      }
    }
  }
  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});
