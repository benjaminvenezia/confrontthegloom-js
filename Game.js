window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Particle {}

  class Layer {}

  class Background {}

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.enemyTimer = 0;
      //fréquence initiale d'apparition des ennemis
      this.enemyInterval = 2000;
      this.ammo = 20;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 500;
      this.gameOver = false;
      this.xp = 0;
      this.gameTime = 0;

      this.difficultyTimer = 0;
      //fréquence en ms entre chaque réduction de l'interval de temps d'apparition
      this.difficultyInterval = 5000;
      //durée à décrémenter à chaque événement de diminution du temps
      this.enemyIntervalDecrement = 50;
    }

    setGameOver(bool) {
      this.gameOver = bool;
    }

    update(deltaTime) {
      if (!this.gameOver) {
        this.gameTime += deltaTime;

        const formattedTime = (this.gameTime * 0.001).toFixed(1);

        if (this.difficultyTimer > this.difficultyInterval) {
          this.enemyInterval -= this.enemyIntervalDecrement;
          this.difficultyTimer = 0;
          console.log(this.enemyInterval);
        } else {
          this.difficultyTimer += deltaTime;
        }
      }

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
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          this.player.lives--;
          console.log(this.player.lives);
        }

        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;

            if (enemy.lives <= 0) {
              enemy.markedForDeletion = true;
              this.xp += enemy.xp;
            }
          }
        });
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }

    draw(context) {
      this.player.draw(context);
      this.ui.draw(context);

      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
    }

    addEnemy() {
      this.enemies.push(new Minion1(this));
    }

    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
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
