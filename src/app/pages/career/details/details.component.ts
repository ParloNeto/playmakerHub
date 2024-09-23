import { transformSeasonString } from './../../../shared/utils/utils';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { DetailsManagerClubIconComponent } from '../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { IconPlayerComponent } from '../../../shared/components/icon-player/icon-player.component';
import { NewCareer } from '../../../models/career/new-career';
import { ListPlayerComponent } from '../../../shared/components/list-player/list-player.component';
import { LoaderModule } from '../../../shared/components/loader/loader.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    DetailsManagerClubIconComponent,
    IconPlayerComponent,
    ListPlayerComponent,
    LoaderModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  #careerService = inject(CareerService);
  #activatedRoute = inject(ActivatedRoute);


  public getCareerDetails = this.#careerService.getCareerDetails;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public getPlayersFromCareer = this.#careerService.getPlayersFromCareer;
  public season = signal<string>('');
  public showSeason = transformSeasonString


  ngOnInit(): void {
    console.log(this.getPlayersFromCareer())
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        console.log(params);
        const id = params['id'];
        this.season.set(params['season']);

        if (this.season() != 'geral') {
          this.#careerService.httpPlayersFilteredBySeason$(id, this.season()).subscribe()
        } else {
          this.#careerService.httpPlayersOfCareersGeralById$(id).subscribe();
        }



        this.#careerService.httpCareersById$(id)
        .subscribe({
          next: (career: NewCareer) => {
            this.#careerService
              .httpSeasonByInitialSeason$(career.fifaCareer)
              .subscribe();
          },
        });
      },
    });
  }
}
