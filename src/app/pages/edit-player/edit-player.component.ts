import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { PlayerService } from '../services/player.service';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { IconPlayerComponent } from '../../shared/components/icon-player/icon-player.component';
import { CareerService } from '../services/career.service';
import { transformSeasonString } from '../../shared/utils/utils';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { StatisticsComponent } from '../../shared/components/statistics/statistics.component';

@Component({
  selector: 'phub-edit-player',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    DetailsManagerClubIconComponent,
    ModalComponent,
    IconPlayerComponent,
    LoaderModule,
    DetailsManagerClubIconComponent,
    StatisticsComponent
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlayerComponent implements OnInit {
  public id = signal<string | null>(null);
  public idCareerOfPlayer = signal<string | null>(null);
  public season = signal<string | null>(null);
  #playerService = inject(PlayerService);
  #careerService = inject(CareerService);
  #activatedRoute = inject(ActivatedRoute);

  getPlayerById = this.#playerService.getPlayerById;
  getCareerDetails = this.#careerService.getCareerDetails;

  showSeason = transformSeasonString;

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id.set(params['id']);
        this.season.set(params['season']);
      },
    });
    const id = this.id() as string;
    this.#playerService.httpGetPlayerById$(id).subscribe({
      next: (res) => {
        console.log(res)
        this.idCareerOfPlayer.set(res.idCareer);
      },
    });

    if (this.idCareerOfPlayer()) {
      this.#careerService
        .httpCareersById$(this.idCareerOfPlayer()!)
        .subscribe();
    }
  }
}
