import { Game } from "../models/game";
import { Score } from "../models/score";

export interface ResultComponent {
  game: Game,
  scores: Score[]
}
