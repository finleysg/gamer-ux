import { Hole } from './hole';

export class Course {
  id: number;
  name: string;
  numberOfHoles: number;
  slope: number;
  rating: number;
  holes: Hole[] = [];

  fromJson(json: any): Course {
    this.id = json.id;
    this.name = json.name;
    this.numberOfHoles = json.number_of_holes;
    this.slope = json.slope;
    this.rating = json.rating;
    if (json.holes) {
      json.holes.forEach(hole => {
        this.holes.push(new Hole().fromJson(hole));
      });
    }
    return this;
  }

  toJson(): any {
    let holes = [];
    this.holes.forEach(h => holes.push(h.toJson()));
    return {
      'id': this.id,
      'name': this.name,
      'number_of_holes': this.numberOfHoles,
      'slope': this.slope,
      'rating': this.rating,
      'holes': holes
    }
  }

  getHole(id: number): Hole {
    return this.holes.find(h => h.id === id);
  }

  calculateHandicap(handicapIndex: number): number {
    let handicap = (handicapIndex * this.slope) / 113;
    return Math.round(handicap);
  }
}
