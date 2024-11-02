import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-icon-club',
  standalone: true,
  imports: [],
  template: `

    <div class="image-club">
    @if (teamCareer) {
      <img
        [src]="getSvgPath()"
        src="../../../../../"
        alt="Escudo do {{ teamCareer }}"
        id="badge-{{  formatTeamName(teamCareer)  }}"
      />
    }
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconClubComponent {
  @Input() teamCareer!: string;


  public formatTeamName(teamName: string): string {
    return teamName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  public getSvgPath(): string {
    return `../../../../../assets/images/clubs/${this.formatTeamName(this.teamCareer)}.svg`;
  }

}
