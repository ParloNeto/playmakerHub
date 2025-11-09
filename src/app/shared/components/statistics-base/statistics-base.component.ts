import { BaseStatsPlayer } from './../../../models/player/base-stats-player';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { BaseStats } from '../../../models/career/base-stats';

@Component({
    selector: 'phub-statistics-base',
    imports: [],
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class StatisticsBaseComponent<T extends BaseStats | BaseStatsPlayer> {
  public stats = signal<T | null>(null);

  @Input() set statistics(value: T | null) {
    this.stats.set(value);
  }
}
