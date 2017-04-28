import { Pipe, PipeTransform } from '@angular/core';
import { LeaderboardHole } from "../../models/leaderboard";

@Pipe({
  name: 'sideFilter',
  pure: false
})
export class LeaderboardPipe implements PipeTransform {

  transform(value: any[], side: string): any {
    if (side === 'front') {
      return value.filter(hole => hole.holeNumber <= 9);
    } else {
      return value.filter(hole => hole.holeNumber > 9);
    }
  }
}
