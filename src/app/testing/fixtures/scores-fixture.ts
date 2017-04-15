import { Score } from '../../models/score';
import { Player } from '../../models/player';

export class ScoreFixture {

  get allScores(): Score[] {
    let scores = [];
    let jsonArray = [
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 2,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 5,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 9,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 14,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 1,
        "hole": 18,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 1,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 7,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 11,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 17,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 2,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 1,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 2,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 3,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 2,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 5,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 10,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 14,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 15,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 4,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 4,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 7,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 8,
        "gross_score": 2,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 13,
        "gross_score": 2,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 14,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 15,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 5,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 2,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 3,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 14,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 17,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 6,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 1,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 7,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 15,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 17,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 7,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 1,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 3,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 11,
        "gross_score": 6,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 14,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 8,
        "hole": 18,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 1,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 2,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 12,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 13,
        "gross_score": 2,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 17,
        "gross_score": 6,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 9,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 1,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 4,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 7,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 8,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 10,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 17,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 10,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 1,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 7,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 8,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 10,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 17,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 11,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 1,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 2,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 4,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 7,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 8,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 10,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 15,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 12,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 1,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 3,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 4,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 5,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 6,
        "gross_score": 2,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 7,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 9,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 10,
        "gross_score": 2,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 11,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 14,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 15,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 16,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 17,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 13,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 2,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 4,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 9,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 10,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 12,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 15,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 17,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 14,
        "hole": 18,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 1,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 2,
        "gross_score": 6,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 3,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 4,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 5,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 6,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 7,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 8,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 9,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 10,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 11,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 12,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 13,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 14,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 15,
        "gross_score": 5,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 16,
        "gross_score": 3,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 17,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      },
      {
        "id": 1,
        "round": 1,
        "player": 15,
        "hole": 18,
        "gross_score": 4,
        "no_score": false,
        "proxy": false
      }
    ]
    jsonArray.forEach(json => {
      scores.push(new Score().fromJson(json));
    });
    return scores;
  }

  get allPlayers(): Player[] {
    let jsonArray = [
      {
        "id": 1,
        "name": "DJ",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 2,
        "name": "Jim",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 3,
        "name": "Scott",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 4,
        "name": "Shane",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 5,
        "name": "Sergio",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 6,
        "name": "Branden",
        "handicap": 0,
        "group": 2
      },
      {
        "id": 7,
        "name": "Kevin N",
        "handicap": 0,
        "group": 2
      },
      {
        "id": 8,
        "name": "Duffner",
        "handicap": 0,
        "group": 2
      },
      {
        "id": 9,
        "name": "Zach",
        "handicap": 0,
        "group": 2
      },
      {
        "id": 10,
        "name": "Jason",
        "handicap": 0,
        "group": 1
      },
      {
        "id": 11,
        "name": "Dan",
        "handicap": 0,
        "group": 3
      },
      {
        "id": 12,
        "name": "David",
        "handicap": 0,
        "group": 3
      },
      {
        "id": 13,
        "name": "Brooks",
        "handicap": 0,
        "group": 3
      },
      {
        "id": 14,
        "name": "Kevin S",
        "handicap": 0,
        "group": 3
      },
      {
        "id": 15,
        "name": "Steele",
        "handicap": 0,
        "group": 3
      }
    ];
    return jsonArray.map(j => new Player().fromJson(j));
  }
}

