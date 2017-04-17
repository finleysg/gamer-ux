import { SkinService } from './skin.service';
import { RoundService } from '../core/round.service';
import { Round } from '../models/round';
import { CourseFixture } from '../testing/fixtures/course-fixture';
import { ScoreFixture } from '../testing/fixtures/scores-fixture';

describe('SkinService', () => {

  let service: SkinService;
  let scoreFixture: ScoreFixture = new ScoreFixture();
  const fakeRoundService = {
    get round(): Round {
      let oakmont = new CourseFixture().getOakmont();
      let round = new Round();
      round.course = oakmont;
      return round;
    }
  };

  beforeEach(() => {
    service = new SkinService(fakeRoundService as RoundService);
  });

  it('#getGrossSkin should return the low score', () => {
    const scores = scoreFixture.allScores.filter(s => s.holeId === 1);
    scores.forEach(score => {
      score.hole = fakeRoundService.round.course.holes.find(h => h.id === 1);
      score.player = scoreFixture.allPlayers.find(p => p.id === score.playerId);
    });
    scores[0].grossScore = 2; //eagle for DJ

    const skin = service.getGrossSkin(scores);

    expect(skin).not.toBeNull();
    expect(skin.grossScore).toBe(2);
    expect(skin.player.name).toBe('DJ');
  });
});
