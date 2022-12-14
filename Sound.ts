class Sound {
  private audio: any;
  private btn_silence: any;
  private is_paused: boolean;

  constructor() {
    this.audio = document.getElementById("gameaudio");
    this.btn_silence = document.getElementById("btn_silence_audio");
    this.btn_silence.addEventListener("click", () => {
      this.silenceAudio();
    });
    this.is_paused = false;
  }

  public shotSound(): void {
    const audio = new Audio("./assets/sounds/fireball_sound.wav");
    audio.play();
  }

  public contactWithEnnemySound(): void {
    const audio = new Audio("./assets/sounds/choc_with_enemy.wav");
    audio.volume = 0.1;
    audio.play();
  }

  public hurtSound(): void {
    const audio = new Audio("./assets/sounds/hurtSound.wav");
    audio.volume = 0.1;
    audio.play();
  }

  setupGameAudio() {
    if (!this.is_paused) {
      console.log("Start audio!!");
      this.audio.play();
    }
  }

  public silenceAudio(): void {
    console.log("Stop audio!!");
    this.is_paused = !this.is_paused;

    this.audio.pause();
  }

  public isPlaying(currentAudio: any): boolean {
    return currentAudio && currentAudio.currentTime > 0 && !currentAudio.paused && !currentAudio.ended && currentAudio.readyState > 2;
  }

  public startGameAudio(): void {
    if (!this.isPlaying(gameaudio)) {
      this.setupGameAudio();
    }
  }
}
