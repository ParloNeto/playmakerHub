import { StatisticsHistory } from './../../../models/player/statistics-history';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Statistics } from '../../../models/player/statistics';
import { NgIf } from '@angular/common';

@Component({
  selector: 'phub-statistics',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="statistics">
      @if (statisticsHistory) {
        <div class="column-stats">
        <h4 class="column-stats-field">Jogos</h4>
        <h4 class="column-stats-field__number">{{statisticsHistory.matches}}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Gols</h4>
        <h4 class="column-stats-field__number">{{statisticsHistory.goals}}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Assistências</h4>
        <h4 class="column-stats-field__number">{{statisticsHistory.assists}}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Cartões Amar.</h4>
        <h4 class="column-stats-field__number">{{statisticsHistory.yellowCards}}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Cartões Verm.</h4>
        <h4 class="column-stats-field__number">{{statisticsHistory.redCards}}</h4>
      </div>
      }
    </div>
  `,
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  @Input() statisticsHistory!: StatisticsHistory;
  @Input() statistics!: Statistics;
}
