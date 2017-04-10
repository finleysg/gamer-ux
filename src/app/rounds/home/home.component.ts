import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { RoundService } from '../../core/round.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionCode: string;

  constructor(
    private roundService: RoundService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  newSession(): void {
    this.router.navigate(['courses/select']);
  }

  findSession(): void {
    if (!this.sessionCode || this.sessionCode.length < 5) {
      return;
    }
    this.roundService.joinRound(this.sessionCode)
      .then((found: boolean) => {
        if (found) {
          this.router.navigate(['rounds', this.sessionCode.toLowerCase(), 'summary']);
        } else {
          this.snackBar.open(`${this.sessionCode} does not exist`, '', { duration: 5000 });
          //this.sessionCode = '';
        }
      })
      .catch((err) => {
        this.snackBar.open(err);
      });
  }
}
