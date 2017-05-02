import {Course} from "../../models/course";
import {Score, Skin} from "../../models/score";
import {Player} from "../../models/player";
import {Team} from "../../models/team";

export class Skinsboard {
  players: SkinsPlayer[];
  course: Course;

  constructor(course: Course) {
    this.course = course;
    this.players = [];
  }

  load(teams: Team[], scores: Score[], skins: Skin[]): void {
    this.players = [];
    teams.forEach((team: Team) => {
      const playerScores = scores.filter(s => s.playerId === team.playerId);
      this.players.push(new SkinsPlayer(this.course, playerScores[0].player, team.strokes, playerScores, skins));
    });
  }
}

export class SkinsPlayer {
  name: string;
  strokes: number;
  totalFrontScore: number;
  totalBackScore: number;
  totalScore: number;
  holes: SkinsHole[];

  constructor(course: Course, player: Player, strokes: number, scores: Score[], skins: Skin[]) {
    this.name = player.name;
    this.strokes = strokes;
    this.totalScore = 0;
    this.totalFrontScore = 0;
    this.totalBackScore = 0;
    this.holes = [];

    course.holes.forEach(h => {
      let score = scores.find(s => s.holeId === h.id && s.playerId === player.id);
      let hole = new SkinsHole();
      hole.holeNumber = h.holeNumber;
      hole.score = !score ? 0 : score.grossScore - h.getBumps(this.strokes, course.numberOfHoles);
      this.totalScore += hole.score;
      if (h.holeNumber <= 9) {
        this.totalFrontScore += hole.score;
      } else {
        this.totalBackScore += hole.score;
      }
      let idx = skins.findIndex(s => s.hole.id === h.id && s.player.id === player.id);
      hole.isSkin = idx >= 0;
      this.holes.push(hole);
    });
  }
}

export class SkinsHole {
  holeNumber: number;
  score: number;
  isSkin: boolean;
}
