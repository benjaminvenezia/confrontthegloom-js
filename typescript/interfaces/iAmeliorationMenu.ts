export default interface iAmeliorationMenu {
  getPlayerSpeed(): number;
  getPlayerLife(): number;
  getBulletSpeed(): number;
  getPlayerDamage(): number;
  updateMobsApparitionForPrinting(initialEnemyInterval: number): void;
}
