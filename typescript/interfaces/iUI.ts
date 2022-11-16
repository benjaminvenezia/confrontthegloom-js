import iGame from "./iGame";
import iAmeliorationMenu from "./iAmeliorationMenu";

export default interface iUI {
  game: iGame;
  ameliorationMenu: iAmeliorationMenu;
  fontSize: number;
  fontFamily: string;
  color: string;
  isSoundDeathActivated: boolean;
}
