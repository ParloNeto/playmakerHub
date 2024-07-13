import { Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { getInitialSeasonByFIFAVersion } from '../../services/mocks/fifaVersion-mocks';
import { DetailsManagerClubIconComponent } from '../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { Player } from '../../../models/player/player';
import { IconPlayerComponent } from '../../../shared/components/icon-player/icon-player.component';
import { NewCareer } from '../../../models/career/new-career';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    DetailsManagerClubIconComponent,
    IconPlayerComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  #careerService = inject(CareerService);
  #activatedRoute = inject(ActivatedRoute);

  public getCareerDetails = this.#careerService.getCareerDetails;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public getPlayersFromCareer = signal<Player[] | undefined | null>(null);
  public season!: string;

  ngOnInit(): void {
    this.getCareerDetails;
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        console.log(params);
        const id = params['id'];
        this.season = params['season'];
        this.#careerService.httpCareersById$(id).subscribe({
          next: (career: NewCareer) => {
            this.getPlayersFromCareer.set(career.players);
            this.#careerService
              .httpSeasonByInitialSeason$(career.fifaCareer)
              .subscribe();
          },
        });
      },
    });
  }

  public showSeason(fifaCareer: string): string {
    // this.getPlayersFromCareer()?.filter((res) => res.position === 'GOL')
    return getInitialSeasonByFIFAVersion(fifaCareer);
  }
}
