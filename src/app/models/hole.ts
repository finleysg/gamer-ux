export class Hole {
  id: number;
  courseId: number;
  holeNumber: number;
  par: number;
  handicap: number;

  fromJson(json: any): Hole {
    this.id = json.id;
    this.courseId = json.course;
    this.holeNumber = json.holeNumber;
    this.par = json.par;
    this.handicap = json.handicap;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'course': this.courseId,
      'hole_number': this.holeNumber,
      'par': this.par,
      'handicap': this.handicap
    }
  }
}
