import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IIconPlayer } from '../../interface/icon-player';
import { environment } from '../../../../environments/environment';
import { Player } from '../../../models/player/player';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'phub-icon-player-base',
    imports: [RouterLink],
    templateUrl: './icon-player-base.component.html',
    styleUrl: './icon-player-base.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPlayerBaseComponent implements IIconPlayer {
  @Input() public player!: Player;
  @Input() public showBackground: boolean = false;
  @Input() public showPlayerSeason: boolean = false;
  @Input() public enableEdit: boolean = false;

  returnImageByName(imageNameUrl: string): string {
    if (imageNameUrl.startsWith('http') || imageNameUrl.startsWith('https')) {
          return imageNameUrl;
        } else {
          return `${environment.DOWNLOAD_FILE_URL}/${imageNameUrl}`;
        }
  }

}
