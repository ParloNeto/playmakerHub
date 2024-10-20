import { transformSeasonString } from './../../../shared/utils/utils';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { DetailsManagerClubIconComponent } from '../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { IconPlayerSeasonComponent } from '../../../shared/components/icon-player-season/icon-player-season.component';
import { NewCareer } from '../../../models/career/new-career';
import { isValidTypeSeasonKey, TypeSeason } from '../../../models/enums/type-season';
import { ListPlayerComponent } from '../../../shared/components/list-player/list-player.component';
import { LoaderModule } from '../../../shared/components/loader/loader.module';
import { ModalService } from '../../services/modal.service';
import { finalize, take } from 'rxjs';
import { ModalState } from '../../../models/enums/modal-state';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    DetailsManagerClubIconComponent,
    IconPlayerSeasonComponent,
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
  #modalService = inject(ModalService);


  public getCareerDetails = this.#careerService.getCareerDetails;
  public isValidTypeSeasonKey = isValidTypeSeasonKey;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public getPlayersFromCareer = this.#careerService.getPlayersFromCareer;
  public getAvailablePlayersForSeason = this.#careerService.getAvailablePlayersForSeason;
  public getPlayersFromCareerFilteredBySeason = this.#careerService.getPlayersFromCareerFilteredBySeason;
  public season = signal<string>('');
  public id = signal<string>('');
  public showSeason = transformSeasonString


  ngOnInit(): void {
    console.log(this.getPlayersFromCareer())
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        console.log(params);
        this.id.set(params['id']);
        this.season.set(params['season']);

        if (isValidTypeSeasonKey(this.season())) {
          this.#careerService.httpPlayersFilteredBySeason$(this.id(), this.season()).subscribe();
        } else if (this.season() === 'geral') {
          this.#careerService.httpPlayersOfCareersGeralById$(this.id()).subscribe();
        } else {
          this.#modalService.showError("Temporada não encontrada.");
        }

        this.#careerService.httpCareersById$(this.id())
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

  modalAddPlayerToActualSeason() {
    this.#careerService.httpGetAvailablePlayersForSeason$(this.id(), this.season())
    .pipe(finalize(() => {
      this.#modalService.showTransferPlayer(
        'Selecione o jogador que deseja adicionar nessa temporada',
        this.getAvailablePlayersForSeason()
      );
      this.#modalService.confirmTransferPlayerState().subscribe((player) => {

        if (player) {
          const bodySeason = this.getCareerDetails()?.seasons?.filter((season) => season.seasonName === this.season())

          if (bodySeason) {
            this.#careerService.httpUpdatePlayerToSeason$(this.id(), player.id, bodySeason[0]).subscribe()
          }
        } else {
          return;
        }
      });
    }))
    .subscribe();
  }
}
