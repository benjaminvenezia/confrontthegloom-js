window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowLeft") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === " ") {
          this.game.player.shootTop();
        }
      });

      window.addEventListener("keyup", (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 15;
      this.height = 15;
      this.speed = 5;
      this.markedForDeletion = false;
    }

    update() {
      this.x += this.speed;

      if (this.x > this.game.width) {
        this.markedForDeletion = true;
      }
    }

    draw(context) {
      context.fillStyle = "yellow";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  class Particle {}

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 60;
      this.height = 90;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 5;
      this.projectiles = [];
      this.lives = 3;
    }

    update() {
      if (this.game.keys.includes("ArrowUp") && this.game.player.y > 0) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes("ArrowDown") && this.game.player.y < this.game.height - this.game.player.height) {
        this.speedY = this.maxSpeed;
      } else if (this.game.keys.includes("ArrowRight")) {
        this.speedX = this.maxSpeed;
      } else if (this.game.keys.includes("ArrowLeft")) {
        this.speedX = -this.maxSpeed;
      } else {
        this.speedY = 0;
        this.speedX = 0;
      }

      this.y += this.speedY;
      this.x += this.speedX;

      this.projectiles.forEach((projectile) => {
        projectile.update();
      });

      this.projectiles = this.projectiles.filter((projectile) => !projectile.markedForDeletion);
    }

    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);

      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
    }

    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(new Projectile(this.game, this.x + 40, this.y + 50));
        this.game.ammo--;
      }
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
    }

    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }
    }

    draw(context) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px helvetica";
      context.fillText(this.lives, this.x, this.y);
    }
  }

  class Angler1 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 58;
      this.height = 69;
      this.lives = 2;
      this.xp = this.lives;
      this.y = Math.random() * (this.game.height - this.height / 2);
    }
  }

  class Layer {}

  class Background {}

  class UI {
    constructor(game) {
      this.game = game;
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
      this.enemies.push(new Angler1(this));
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
