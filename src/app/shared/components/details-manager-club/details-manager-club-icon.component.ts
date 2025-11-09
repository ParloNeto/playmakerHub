import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { IconClubComponent } from './icon-club/icon-club.component';
import { IconManagerComponent } from './icon-manager/icon-manager.component';
import { Top3StatsPlayersCareerComponent } from '../top-3-stats-players-career/top-3-stats-players-career.component';
import { Coach } from '../../../models/career/Coach';
import { NgIf } from '@angular/common';
import { Player } from '../../../models/player/player';
import { IconPlayerBaseComponent } from '../icon-player-base/icon-player-base.component';

@Component({
  selector: 'phub-details-photo',
  standalone: true,
  imports: [
    IconManagerComponent,
    IconClubComponent,
    IconPlayerBaseComponent,
  ],
  template: `
    <div class="phub-details-photo">
      @if (clubName) {
      <app-icon-club [teamCareer]="clubName"></app-icon-club>

      } @if (manager) {
      <app-icon-manager [manager-details]="manager"></app-icon-manager>

      } @if (player) {
      <phub-icon-player-base
        [player]="player"
        [showBackground]="true"
      ></phub-icon-player-base>

      } @else if (creatingManager) {
      <app-icon-manager
        [creating-manager]="creatingManager"
      ></app-icon-manager>

      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsManagerClubIconComponent {
  @Input() manager!: Coach;
  @Input() player!: Player;

  @Input() clubName?: string;
  @Input() creatingManager!: {
    name: string,
    url: string
  };
}
