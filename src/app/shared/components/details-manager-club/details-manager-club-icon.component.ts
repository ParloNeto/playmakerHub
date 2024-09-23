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

@Component({
  selector: 'app-details-manager-club-icon',
  standalone: true,
  imports: [
    IconManagerComponent,
    IconClubComponent,
    Top3StatsPlayersCareerComponent,
    NgIf,
  ],
  template: `
    <div class="image-club-and-manager-pic">
      @if (clubName) {
      <app-icon-club [teamCareer]="clubName"></app-icon-club>

      } @if (manager) {
      <app-icon-manager [manager-details]="manager"></app-icon-manager>

      } @else if (personName && url) {
      <app-icon-manager
        [creating-person]="{
          name: personName,
          url: url
        }"
      ></app-icon-manager>

      }

      <!-- @if (careerInput.players && showTop3PlayersScreen) {
        <app-top-3-stats-players-career [players]="careerInput.players"/>
      } -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsManagerClubIconComponent {
  @Input() manager!: Coach;
  @Input() showTop3PlayersScreen!: boolean;

  @Input() clubName!: string;
  @Input() personName!: string;
  @Input() url!: string;
}
