import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RoundService} from "../../core/round.service";
import {Round} from "../../models/round";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  round: Round;
  title: string = 'Start a New Round';
  
  constructor(
    private roundService: RoundService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roundService.currentRound$.subscribe(round => {
      this.round = round;
      if (round.code) {
        this.title = round.code;
      }
    });
  }

}
