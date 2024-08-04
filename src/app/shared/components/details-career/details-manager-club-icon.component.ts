import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconManagerComponent } from '../details-manager-club/icon-manager/icon-manager.component';
import { NewCareer } from '../../../models/career/new-career';
import { IconClubComponent } from '../details-manager-club/icon-club/icon-club.component';

@Component({
  selector: 'app-details-manager-club-icon',
  standalone: true,
  imports: [IconManagerComponent, IconClubComponent],
  template: `
    <div class="image-club-and-manager-pic">
      <app-icon-club [careerUtils]="careerInput"></app-icon-club>
      <app-icon-manager [manager]="careerInput"></app-icon-manager>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsManagerClubIconComponent {
  @Input() careerInput!: NewCareer;
}
