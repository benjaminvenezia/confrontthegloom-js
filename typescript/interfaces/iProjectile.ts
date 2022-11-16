import iGame from "./iGame";

export default interface iProjectile {
  game: iGame;
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  damage: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
  getMarkedForDeletion(): boolean;
}
