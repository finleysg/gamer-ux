export class Player {
  id: number;
  name: string;
  handicap: number;
  groupId: number;

  fromJson(json: any): Player {
    this.id = json.id;
    this.name = json.name;
    this.handicap = json.handicap;
    this.groupId = json.group;
    return this;
  }

  toJson(): any {
    return {
      'id': this.id,
      'name': this.name,
      'handicap': this.handicap,
      'group': this.groupId
    }
  }
}
