import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
  private subscription: Subscription;

  constructor(
    private roundService: RoundService,
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.roundService.currentRound.subscribe(round => {
      this.round = round;
      this.groups = cloneDeep(round.groups);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addGroup(): void {
    this.groups.push(this.groupService.newGroup(this.round));
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
      this.router.navigate(['/games']);
    });
  }
}
