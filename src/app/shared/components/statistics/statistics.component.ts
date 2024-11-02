import { StatisticsHistory } from './../../../models/player/statistics-history';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Statistics } from '../../../models/player/statistics';
import { NgIf } from '@angular/common';

@Component({
  selector: 'phub-statistics',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="statistics">
      @if (this.stats()) {
      <div class="column-stats">
        <h4 class="column-stats-field">Jogos</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.matches }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Gols</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.goals }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Assistências</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.assists }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Cartões Amar.</h4>
        <h4 class="column-stats-field__number">
          {{ this.stats()!.yellowCards }}
        </h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Cartões Verm.</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.redCards }}</h4>
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {

  @Input() statisticsHistory!: StatisticsHistory;
  @Input() statisticsSeason!: Statistics  | null ;

  public stats = signal<StatisticsHistory | Statistics | null>(null);

  ngOnInit(): void {
    if (this.statisticsHistory) {
      this.stats.set(this.statisticsHistory);
    } else {
      this.stats.set(this.statisticsSeason);
    }

  }

}
