import iGame from "./iGame";

export default interface iProjectile {
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
  getMarkedForDeletion(): boolean;
  getDamage(): number;
}
