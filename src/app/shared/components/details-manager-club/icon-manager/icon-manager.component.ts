import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Coach } from '../../../../models/career/Coach';

import { UploadFileService } from '../../../../pages/services/upload-file.service';
import { environment } from '../../../../../environments/environment';
import { IIconPlayer } from '../../../interface/icon-player';

@Component({
    selector: 'app-icon-manager',
    imports: [],
    template: `
    <div class="image-manager">
      @if (manager) {
      <div class="image-manager__background">
        <img
          [src]="this.returnImageByName(manager.urlImageCoach)"
          alt="Foto do Manager {{ manager.coachesName }}"
        />
      </div>
      <h3>{{ manager.coachesName }}</h3>
      } @else if (creatingManager) {
      <div class="image-manager__background">
        <img
          [src]="this.returnImageByName(creatingManager.url)"
          alt="Foto do Manager {{ creatingManager.name }}"
        />
      </div>
      <h3>{{ creatingManager.name }}</h3>
      } @else {
      <div class="image-manager__background">
        <img
          src="../../../../../assets/images/players/dudu.svg"
          alt="Foto do Manager"
        />
      </div>
      <h3>Nome do Manager</h3>
      }
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconManagerComponent implements OnInit {
  ngOnInit(): void {}

  @Input({ alias: 'manager-details' }) manager!: Coach;
  @Input({ alias: 'creating-manager' }) creatingManager!: {
    name: string;
    url: string;
  };

  public returnImageByName(imageNameUrl: string) {
    if (imageNameUrl.startsWith('http') || imageNameUrl.startsWith('https')) {
      return imageNameUrl;
    } else {
      return `${environment.DOWNLOAD_FILE_URL}/${imageNameUrl}`;
    }
  }
}
