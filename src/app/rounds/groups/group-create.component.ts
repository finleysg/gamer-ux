import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Router, ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { RoundService } from '../../core/round.service';
import { GroupService } from '../../core/group.service';
import { Round } from '../../models/round';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  round: Round;
  groups: Group[];

  constructor(
    private roundService: RoundService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {round: Round}) => {
        this.round = data.round;
        this.groups = cloneDeep(this.round.groups);
        // Don't make the user add the first group
        if (this.groups.length === 0) {
          this.groupService.newGroup(this.round.id, this.groups);
        }
      });
  }

  addGroup(): void {
    this.groupService.newGroup(this.round.id, this.groups);
  }

  removeGroup(groupNumber: number): void {
    this.groupService.removeGroup(groupNumber, this.groups);
  }

  addPlayer(group: Group): void {
    this.groupService.addPlayer(group);
  }

  removePlayer(localId: number): void {
    this.groupService.removePlayer(localId, this.groups);
  }

  onNext(): void {
    this.roundService.saveGroups(this.groups).then(() => {
      this.router.navigate(['gameTypes'], { relativeTo: this.route.parent });
    });
  }
}
