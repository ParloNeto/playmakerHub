import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '../../../../models/player/player';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'phub-icon-player',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="image-manager">
      @if (player) {
      <div class="image-manager__background">
        <img
          [src]="this.returnImageByName(player.urlImagePlayer)"
          alt="Foto do Jogador {{ player.firstName + player.lastName }}"
        />
      </div>
      <div class="name-player-and-nation">
        <h3>{{ player.firstName }} - {{ player.nationality }}</h3>
        <img
          id="player-nation-img"
          src="../../../../../assets/images/nation/{{
            player.nationality.toLocaleLowerCase()
          }}.png"
          alt="{{ player.nationality }}"
        />
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPlayerComponent {
  @Input() public player!: Player;

  public returnImageByName(imageNameUrl: string) {
    if (imageNameUrl.startsWith('http') || imageNameUrl.startsWith('https')) {
      return imageNameUrl;
    } else {
      return `${environment.DOWNLOAD_FILE_URL}/${imageNameUrl}`;
    }
  }
}
