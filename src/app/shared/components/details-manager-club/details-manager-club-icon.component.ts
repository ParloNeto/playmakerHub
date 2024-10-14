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
import { IconPlayerComponent } from '../icon-player/icon-player/icon-player.component';

@Component({
  selector: 'phub-details-photo',
  standalone: true,
  imports: [
    IconManagerComponent,
    IconClubComponent,
    Top3StatsPlayersCareerComponent,
    NgIf,
    IconPlayerComponent
  ],
  template: `
    <div class="phub-details-photo">
      @if (clubName) {
      <app-icon-club [teamCareer]="clubName"></app-icon-club>

      } @if (manager) {
      <app-icon-manager [manager-details]="manager"></app-icon-manager>

      } @if (player) {
      <phub-icon-player [player]="player"></phub-icon-player>

      } @else if (personName && url) {
      <app-icon-manager
        [creating-person]="{
          name: personName,
          url: url
        }"
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
  @Input() personName!: string;
  @Input() url!: string;
}
