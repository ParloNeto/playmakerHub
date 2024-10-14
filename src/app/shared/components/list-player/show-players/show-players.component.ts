import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { Player } from '../../../../models/player/player';
import { IconPlayerSeasonComponent } from '../../icon-player-season/icon-player-season.component';

@Component({
  selector: 'phub-show-players',
  standalone: true,
  imports: [IconPlayerSeasonComponent],
  template: `
@for (player of typePlayer(); track player.id) {
        <phub-icon-player-season [getPlayer]="player" />
      }
  `,
  styleUrl: './show-players.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPlayersComponent {
@Input({required: true}) typePlayer!: Signal<Player[]>
}
