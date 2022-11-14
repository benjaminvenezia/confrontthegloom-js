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

// function setupGameAudio(is_paused) {
//   if (!is_paused) {
//     let audio = document.getElementById("gameaudio");
//     console.log("Start audio!!");
//     audio.play();
//   }
// }

// function silenceAudio() {
//   setupGameAudio(true);
//   let audio = document.getElementById("gameaudio");
//   console.log("Stop audio!!");
//   audio.pause();
// }

// function isPlaying(currentAudio) {
//   return currentAudio && currentAudio.currentTime > 0 && !currentAudio.paused && !currentAudio.ended && currentAudio.readyState > 2;
// }

// function startGameAudio() {
//   if (!isPlaying(gameaudio)) {
//     setupGameAudio();
//   }
// }
