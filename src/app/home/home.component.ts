import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { RoundService } from '../core/round.service';
import { Round } from '../models/round';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roundCode: string;

  constructor(
    private roundService: RoundService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  newRound(): void {
    this.router.navigate(['courses/select']);
  }

  findRound(): void {
    if (!this.roundCode || this.roundCode.length < 5) {
      return;
    }
    this.roundService.loadRound(this.roundCode)
      .then((round: Round) => {
        if (round) {
          this.router.navigate(['setup', this.roundCode.toLowerCase(), 'summary']);
        } else {
          this.snackBar.open(`${this.roundCode} does not exist`, '', { duration: 5000 });
        }
      })
      .catch((err) => {
        this.snackBar.open(err);
      });
  }
}
