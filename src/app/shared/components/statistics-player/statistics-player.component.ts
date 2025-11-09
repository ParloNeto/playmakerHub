import { StatisticsHistory } from '../../../models/player/statistics-history';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Statistics } from '../../../models/player/statistics';
import { StatisticsBaseComponent } from '../statistics-base/statistics-base.component';

@Component({
    selector: 'phub-statistics-player',
    imports: [],
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
        <h4 class="column-stats-field__number">{{ this.stats()!.yellowCards }}</h4>
      </div>
      <div class="column-stats">
        <h4 class="column-stats-field">Cartões Verm.</h4>
        <h4 class="column-stats-field__number">{{ this.stats()!.redCards }}</h4>
      </div>
      }
      <ng-content></ng-content>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPlayerComponent extends StatisticsBaseComponent<StatisticsHistory | Statistics> {}
