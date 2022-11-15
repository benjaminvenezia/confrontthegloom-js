function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  );
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function play() {
  let audio = document.getElementById("audio");

  let cardStartTheGame = document.querySelector(".card__start");
  let cardWelcome = document.querySelector(".background-blur");

  cardWelcome.addEventListener("click", () => {
    cardWelcome.classList.add("hide");
    cardStartTheGame.classList.remove("hide");
  });

  audio.play();
}

/**
 * @author Mipam Guillot
 * Calculate the angle between two points
 * @param depart
 * @param finish
 * @returns angle
 */
const calculateAngle = (depart, finish) => {
  let angle = Math.atan2(depart.y - finish.y, depart.x - finish.x);

  return radianToDegree(angle);
};

const move = (base /*{ x, y }*/, angle, velocity) => {
  let coordFinish = { x: 0, y: 0 };

  const radian = degreeToRadian(angle);

  coordFinish.x = base.x - velocity * Math.cos(radian);
  coordFinish.y = base.y - velocity * Math.sin(radian);
  return coordFinish;
};

/**
 * Convert radian to degree
 * @author Mipam Guillot
 * @param radian
 * @returns degree
 */
const radianToDegree = (radian) => {
  return (radian * 180) / Math.PI;
};
/**
 * Convert degree to radian
 * @param degree
 * @returns radian
 */
const degreeToRadian = (degree) => {
  return (degree * Math.PI) / 180;
};
