import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Coach } from '../../../../models/career/Coach';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-icon-manager',
  standalone: true,
  imports: [NgIf],
  template: ` @if (manager) {
    <div class="image-manager">
      <div class="image-manager__background">
        <img
          [src]="manager.urlImageCoach"
          alt="Foto do Manager {{ manager.coachesName }}"
        />
      </div>
      <h3>{{ manager.coachesName }}</h3>
    </div>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconManagerComponent {
  @Input({ alias: 'manager-details' }) manager!: Coach;
}
