import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { CareerHistory } from '../../../models/career/career-history';
import { RouterLink } from '@angular/router';
import { Season } from '../../../models/career/season';
import { StatisticsBaseComponent } from '../statistics-base/statistics-base.component';

@Component({
    selector: 'phub-statistics-career',
    imports: [RouterLink],
    template: `
    <div class="statistics">
      @if (this.stats()) {
      <div class="column-stats">
        <h4 class="column-stats-field">Jogos</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.games }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Vitórias</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.wins }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Empates</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.draws }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Derrotas</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.losses }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Gols sofridos</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.goalsConceded }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Gols marcados</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.goalsScored }}</h4>
      </div>

      @if (this.isSeasonHistoryStatistics) {
      <button class="circle-edit-player">
        <img
          src="../../../../assets/icons/edit-player.svg"
          alt="Edit statistics career"
          routerLink="edit-statistics"
        />
      </button>
      } }
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsCareerComponent extends StatisticsBaseComponent<CareerHistory | Season> {
  public isSeasonHistoryStatistics = false;

  @Input() set careerHistory(value: CareerHistory) {
    this.stats.set(value);
  }

  @Input() set season(value: Season) {
    this.stats.set(value);
    this.isSeasonHistoryStatistics = true;
  }
}
