import { Score } from './score';
import { Course } from './course';
import { Player } from './player';

export class Leaderboard {
  players: LeaderboardPlayer[];
  course: Course;

  constructor(course: Course) {
    this.course = course;
    this.players = [];
  }

  reload(players: Player[], scores: Score[]): void {
    this.players = [];
    players.forEach((player: Player) => {
      const handicap = this.course.calculateHandicap(player.handicapIndex);
      const playerScores = scores.filter(s => s.playerId === player.id);
      this.players.push(new LeaderboardPlayer(player.name, handicap, playerScores));
    });
  }
}

export class LeaderboardPlayer {
  name: string;
  courseHandicap: number;
  totalScore: number;
  totalNetScore: number;
  relativeScore: number;
  relativeNetScore: number;
  holes: LeaderboardHole[];

  constructor(name: string, courseHandicap: number, scores: Score[]) {
    this.name = name;
    this.courseHandicap = courseHandicap;
    this.totalScore = 0;
    this.totalNetScore = 0;
    this.holes = [];
    scores.forEach((score: Score) => {
      let hole = new LeaderboardHole();
      hole.holeNumber = score.hole.holeNumber;
      hole.par = score.hole.par;
      hole.gross = score.grossScore;
      hole.net = score.grossScore - score.hole.getBumps(this.courseHandicap);
      this.totalScore += hole.gross;
      this.totalNetScore += hole.net;
      this.relativeScore += (hole.gross - score.hole.par)
      this.relativeNetScore += (hole.net - score.hole.par)
    });
  }
}

export class LeaderboardHole {
  holeNumber: number;
  par: number;
  gross: number;
  net: number;
}
