import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-club',
  standalone: true,
  imports: [],
  template: `

    <div class="image-club">
    @if (teamCareer) {
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/81/Hertha_BSC_Logo_2012.svg"
        alt="Escudo do {{ teamCareer }}"
      />
    }
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconClubComponent {
  @Input() teamCareer!: string;
}
