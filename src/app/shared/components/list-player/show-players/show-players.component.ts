import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
} from '@angular/core';
import { Player } from '../../../../models/player/player';
import { IconPlayerBaseComponent } from '../../icon-player-base/icon-player-base.component';

@Component({
    selector: 'phub-show-players',
    imports: [IconPlayerBaseComponent],
    template: `
    @for (player of typePlayer(); track player.id) {
    <phub-icon-player-base
      [player]="player"
      [showPlayerSeason]="true"
      [enableEdit]="true"
    ></phub-icon-player-base>
    }
  `,
    styleUrl: './show-players.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPlayersComponent {
  @Input({ required: true }) typePlayer!: Signal<Player[]>;
}
