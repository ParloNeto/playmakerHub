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
import { NgIf } from '@angular/common';
import { UploadFileService } from '../../../../pages/services/upload-file.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-icon-manager',
  standalone: true,
  imports: [NgIf],
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
      } @else if (creatingPerson) {
      <div class="image-manager__background">
        <img
          [src]="this.returnImageByName(creatingPerson.url)"
          alt="Foto do Manager {{ creatingPerson.name }}"
        />
      </div>
      <h3>{{ creatingPerson.name }}</h3>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconManagerComponent implements OnInit {
  ngOnInit(): void {}

  @Input({ alias: 'manager-details' }) manager!: Coach;
  @Input({ alias: 'creating-person' }) creatingPerson!: {
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
