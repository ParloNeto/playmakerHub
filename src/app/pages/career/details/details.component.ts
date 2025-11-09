import { transformSeasonString } from './../../../shared/utils/utils';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { DetailsManagerClubIconComponent } from '../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { NewCareer } from '../../../models/career/new-career';
import { isValidTypeSeasonKey } from '../../../models/enums/type-season';
import { ListPlayerComponent } from '../../../shared/components/list-player/list-player.component';
import { LoaderModule } from '../../../shared/components/loader/loader.module';
import { ModalService } from '../../services/modal.service';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatisticsCareerComponent } from '../../../shared/components/statistics-career/statistics-career.component';
import { Season } from '../../../models/career/season';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Player } from '../../../models/player/player';


type SeasonName = {
  id: string;
  seasonName: string;
};

@Component({
    selector: 'app-details',
    imports: [
        HeaderComponent,
        RouterLink,
        DetailsManagerClubIconComponent,
        ListPlayerComponent,
        LoaderModule,
        StatisticsCareerComponent,
        FormsModule,
        MatAutocompleteModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  #careerService = inject(CareerService);
  #activatedRoute = inject(ActivatedRoute);
  #modalService = inject(ModalService);
  #router = inject(Router);
  #snackBar = inject(MatSnackBar);

  #setPlayersFromCareer = signal<Player[] | null>(null);
  get getPlayersFromCareer() {
    return this.#setPlayersFromCareer.asReadonly();
  }

  #setCareerDetails = signal<NewCareer | null>(null);
  get getCareerDetails() {
    return this.#setCareerDetails.asReadonly();
  }
  #setAvailablePlayersForSeason = signal<Player[] | null>(null);
  get getAvailablePlayersForSeason() {
    return this.#setAvailablePlayersForSeason.asReadonly();
  }

  #setSeasons = signal<SeasonName[] | null>(null);
    get getAllSeasonsByCareer() {
      return this.#setSeasons.asReadonly();
    }

    #setPlayersFromCareerFilteredBySeason = signal<Player[] | null>(null);
  get getPlayersFromCareerFilteredBySeason() {
    return this.#setPlayersFromCareerFilteredBySeason.asReadonly();
  }

  public isValidTypeSeasonKey = isValidTypeSeasonKey;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public seasons = this.#careerService.getAllSeasonsByCareer;

  public season = signal<string>('');
  public seasonHistory = signal<Season | null>(null);
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
          this.#careerService.httpPlayersFilteredBySeason$(this.id(), this.season()).subscribe({
            next: players => this.#setPlayersFromCareerFilteredBySeason.set(players)
          });
        } else if (this.season() === 'geral') {
          this.#careerService.httpPlayersOfCareersGeralById$(this.id()).subscribe({
            next: (players) => this.#setPlayersFromCareer.set(players)
          });
        } else {
          this.#modalService.showError("Temporada não encontrada.");
        }
        this.#careerService.httpSeasonsByCareer$(this.id()).subscribe({
          next: seasonName => this.#setSeasons.set(seasonName)
        });
        this.#careerService.httpCareersById$(this.id())
        .subscribe({
          next: (career: NewCareer) => {
            this.#setCareerDetails.set(career);
            this.#careerService
              .httpSeasonByInitialSeason$(career.fifaCareer)
              .subscribe();
             const filteredSeason = career.seasons?.find((res) => res.seasonName === this.season());

             if (filteredSeason) this.seasonHistory.set(filteredSeason!)

          },
        });
      },
    });
  }

  modalAddPlayerToActualSeason() {
    this.#careerService.httpGetAvailablePlayersForSeason$(this.id(), this.season())
    .pipe(finalize(() => {


    }))
    .subscribe({
      next: (players) => {
        this.#setAvailablePlayersForSeason.set(players);
        this.#modalService.showTransferPlayer(
          'Selecione o jogador que deseja adicionar nessa temporada',
          this.getAvailablePlayersForSeason()


        );

        this.#modalService.confirmTransferPlayerState().subscribe((player) => {

          if (player) {
            const bodySeason = this.getCareerDetails()?.seasons?.filter((season) => season.seasonName === this.season())
            console.log(bodySeason)

            if (bodySeason) {
              this.#careerService.httpUpdatePlayerToSeason$(this.id(), player.id, bodySeason[0]).subscribe();
              this.#router.navigateByUrl(`/career/${this.id()}`);
              this.#snackBar.open('Jogador adicionado com sucesso!', 'Fechar', {
                duration: 3500,
              });
            }
          } else {
            return;
          }
        });
      }
    });
  }
}
