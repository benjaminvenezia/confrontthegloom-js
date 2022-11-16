import { iProjectile } from ".";
import iAmeliorationMenu from "./iAmeliorationMenu";
import iGame from "./iGame";

export default interface iPlayer {
  game: iGame;
  width: number;
  height: number;
  ameliorationMenu: iAmeliorationMenu;
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  maxSpeed: number;
  projectiles: Array<iProjectile>;
  lives: number;

  update(): void;
  shootTop(): void;
  getHeight(): number;
  getWidth(): number;
  draw(): void;
}
