import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../../models/player/player';

@Component({
  selector: 'app-top-3-stats-players-career',
  standalone: true,
  imports: [],
  template: ` <div class="career-lobby-player-stats">
    <h4 class="title-content">Mais Gols</h4>
    <ol class="top-3-players-list">
      @for (player of moreGoals; track player) {
      <li>{{ player.firstName }} - {{ player.getStatisticsBySeasons.goals }}</li>
      }
    </ol>
    <h4 class="title-content">Mais Assistências</h4>
    <ol class="top-3-players-list">
      @for (player of moreAssists; track player) {
      <li>{{ player.firstName }} - {{ player.getStatisticsBySeasons.assists }}</li>
      }
    </ol>
  </div>`,
})
export class Top3StatsPlayersCareerComponent implements OnInit {
  ngOnInit(): void {
    this.sortPlayerByGoals();
    this.sortPlayerByAssists();
  }
  @Input() players!: Player[];
  public moreGoals!: Player[];
  public moreAssists!: Player[];

  public sortPlayerByGoals(): void {
    this.moreGoals = this.players
      .sort((a, b) => b.getStatisticsBySeasons.goals - a.getStatisticsBySeasons.goals)
      .slice(0, 3);
  }

  public sortPlayerByAssists(): void {
    this.moreAssists = this.players
      .sort((a, b) => b.getStatisticsBySeasons.assists - a.getStatisticsBySeasons.assists)
      .slice(0, 3);
  }
}
