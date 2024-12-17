import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../../../models/player/player';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'phub-icon-player-season',
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    @if (player) {
    <div class="box-player">
      <p class="number-player">{{ player.kitNumber }}</p>
      <img
        class="image-player"
        [src]="this.returnImageByName(player.urlImagePlayer)"
        alt="Foto de {{ player.firstName }} {{ player.lastName }}."
      />
      <div class="box-player__info">
        <p class="name-player">{{ player.firstName }}</p>
        <p class="name-player">{{ player.lastName }}</p>
        <button class="circle-edit-player" [routerLink]="[player.id, 'edit-player']">
          <img
            src="../../../../assets/icons/edit-player.svg"
            alt="Edit player"
          />
        </button>
      </div>
      <p class="position-player">{{ player.position }}</p>
    </div>
    }
  `,
  styleUrl: './icon-player-season.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPlayerSeasonComponent {
  @Input({ required: true, alias: 'getPlayer' }) player!: Player;

  public returnImageByName(imageNameUrl: string) {
    if (imageNameUrl.startsWith('http') || imageNameUrl.startsWith('https')) {
      return imageNameUrl;
    } else {
      return `${environment.DOWNLOAD_FILE_URL}/${imageNameUrl}`;
    }
  }
}
