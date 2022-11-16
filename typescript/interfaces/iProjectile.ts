import iGame from "./iGame";

export default interface Projectile {
  game: iGame;
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  damage: number;
  markedForDeletion: boolean;
  update(): null;
}
