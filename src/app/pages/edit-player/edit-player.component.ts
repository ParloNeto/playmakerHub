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
import { IconPlayerSeasonComponent } from '../../shared/components/icon-player-season/icon-player-season.component';
import { CareerService } from '../services/career.service';
import { transformSeasonString } from '../../shared/utils/utils';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { StatisticsComponent } from '../../shared/components/statistics/statistics.component';
import { Top3StatsPlayersCareerComponent } from '../../shared/components/top-3-stats-players-career/top-3-stats-players-career.component';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';
import { Statistics } from '../../models/player/statistics';

@Component({
  selector: 'phub-edit-player',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    DetailsManagerClubIconComponent,
    ModalComponent,
    IconPlayerSeasonComponent,
    LoaderModule,
    DetailsManagerClubIconComponent,
    StatisticsComponent,
    Top3StatsPlayersCareerComponent
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlayerComponent implements OnInit {
  public id = signal<string | null>(null);
  public actualSeason = signal<Statistics | null>(null);
  public idCareerOfPlayer = signal<string | null>(null);
  public season = signal<string | null>(null);
  #playerService = inject(PlayerService);
  #careerService = inject(CareerService);
  #activatedRoute = inject(ActivatedRoute);
  #modalService = inject(ModalService);

  private confirmSubscription!: Subscription;



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

    const seasonFilteredByName = this.getPlayerById()?.statisticsBySeasons.filter((player) => player.season === this.season())

    if(seasonFilteredByName) {
      this.actualSeason.set(seasonFilteredByName[0])
      console.log(this.actualSeason())

    }

  }

  public deletePlayer() {
    this.#modalService.showConfirmation(
          'Tem certeza que deseja deletar essa carreira?',
          'Sim',
          'Não'
        );
  }



  // public openModalConfirmation(): void {
  //   this.subscribeToConfirm(
  //     () => {
  //       console.log('User confirmed the action.');
  //       this.deletePlayer();
  //     },
  //     () => {
  //       console.log('User cancelled the action.');
  //     }
  //   );
  //   this.#modalService.showConfirmation(
  //     'Tem certeza que deseja deletar essa carreira?',
  //     'Sim',
  //     'Não'
  //   );
  // }

  // public deletePlayer(): void {
  //   this.#careerService.httpDeleteCareer$(this.id).subscribe({
  //     next: () => {
  //       this.#router.navigateByUrl(`/home`);
  //       this.#snackBar.open('Carreira removida com sucesso!', 'Fechar', {
  //         duration: 3500,
  //       });
  //     },
  //   });
  // }



}
