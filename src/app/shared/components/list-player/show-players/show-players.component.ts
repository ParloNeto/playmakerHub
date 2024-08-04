import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { Player } from '../../../../models/player/player';
import { IconPlayerComponent } from '../../icon-player/icon-player.component';

@Component({
  selector: 'phub-show-players',
  standalone: true,
  imports: [IconPlayerComponent],
  template: `
@for (player of typePlayer(); track player.id) {
        <icon-player [getPlayer]="player" />
      }
  `,
  styleUrl: './show-players.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPlayersComponent {
@Input({required: true}) typePlayer!: Signal<Player[]>
}
