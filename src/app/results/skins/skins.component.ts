import {Component, OnInit, Input} from '@angular/core';
import {Game} from "../../models/game";
import {Score, Skin} from "../../models/score";
import {SkinService} from "../services/skin.service";
import {ResultComponent} from "../result.component";

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})
export class SkinsComponent implements OnInit, ResultComponent {

  @Input()
  game: Game;
  @Input()
  scores: Score[];

  skins: Skin[];
  winners: any[];
  skinValue: number;

  constructor(private skinService: SkinService) { }

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.skins = this.skinService.calculate(this.game, this.scores);
    this.skinValue = this.skins && this.skins[0].value;
    this.winners = this.skins.reduce((players: any[], skin: Skin) => {
      let player = players.find(p => p.name === skin.player.name);
      if (player) {
        player.numberOfSkins += 1;
        player.total += this.skinValue;
      } else {
        players.push({
          name: skin.player.name,
          numberOfSkins: 1,
          total: this.skinValue
        });
      }
      return players;
    }, []);
  }
}
