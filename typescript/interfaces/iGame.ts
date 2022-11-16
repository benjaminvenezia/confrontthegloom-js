import { iSound, iAmeliorationMenu, iUI, iEnemy, iInputHandler, iPlayer } from "./";

export default interface iGame {
  width: number;
  height: number;
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

  getGameTime(): number;
  getGameOver(): boolean;
  getSound(): iSound;
  getPlayer(): iPlayer;
  getKeys(): Array<String>;
}
