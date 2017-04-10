import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoundService } from '../core/round.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title: string;

  constructor(
    private roundService: RoundService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roundService.currentRound.subscribe(round => {
      this.title = '';
      if (round.code) {
        this.title = `Round ${round.code}`;
      }
    });
  }

}
