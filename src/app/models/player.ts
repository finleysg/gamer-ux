export class Player {
  id: number;
  localId: number; // to uniquely identify a player within a group
  name: string;
  handicapIndex: number = 0.0;
  groupId: number;

  fromJson(json: any): Player {
    this.id = json.id;
    this.name = json.name;
    this.handicapIndex = json.handicap;
    this.groupId = json.group;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'name': this.name,
      'handicap': this.handicapIndex,
      'group': this.groupId
    }
  }
}
