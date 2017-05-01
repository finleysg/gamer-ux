import {Component, OnInit, Input} from '@angular/core';
import {Game} from "../../models/game";
import {Score, Skin} from "../../models/score";
import {SkinService} from "../../core/skin.service";

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})
export class SkinsComponent implements OnInit {

  @Input()
  game: Game;
  @Input()
  scores: Score[];
  
  skins: Skin[];
  
  constructor(private skinService: SkinService) { }

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    this.skins = this.skinService.calculate(this.game, this.scores);
  }
}
