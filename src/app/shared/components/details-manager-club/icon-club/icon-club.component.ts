import { Component, Input } from '@angular/core';
import { NewCareer } from '../../../../models/career/new-career';

@Component({
  selector: 'app-icon-club',
  standalone: true,
  imports: [],
  template: `
    <div class="image-club">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/81/Hertha_BSC_Logo_2012.svg"
        alt="Escudo do {{ teamCareer }}"
      />
    </div>
  `,
})
export class IconClubComponent {
  @Input() teamCareer!: string;
}
