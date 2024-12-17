




  import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { CareerService } from '../services/career.service';
import { ModalService } from '../services/modal.service';
import { SeasonService } from '../services/season.service';
import { Season } from '../../models/career/season';
import { Statistics } from '../../models/player/statistics';
import { isValidTypeSeasonKey } from '../../models/enums/type-season';
import { transformSeasonString } from '../../shared/utils/utils';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { IconPlayerSeasonComponent } from '../../shared/components/icon-player-season/icon-player-season.component';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { StatisticsComponent } from '../../shared/components/statistics/statistics.component';
import { Top3StatsPlayersCareerComponent } from '../../shared/components/top-3-stats-players-career/top-3-stats-players-career.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NewCareer } from '../../models/career/new-career';
import { Player } from '../../models/player/player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'phub-edit-player',
  templateUrl: './edit-player.component.html',
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
    Top3StatsPlayersCareerComponent,
    FormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styleUrls: ['./edit-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlayerComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  ngDoCheck(): void {
    console.log()
  }

  public id = signal<string | null>(null);
  public actualSeason = signal<Statistics | null>(null);
  public idCareer = signal<string | null>(null);
  public seasonObj = signal<Season | null>(null);
  public season = signal<string | null>(null);


  private playerService = inject(PlayerService);
  private careerService = inject(CareerService);
  private seasonService = inject(SeasonService);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private modalService = inject(ModalService);
  private cdr = inject(ChangeDetectorRef);

  public showSeason = transformSeasonString;
  public isValidTypeSeasonKey = isValidTypeSeasonKey;

  #setPlayerById = signal<Player | null>(null);
  get getPlayerById() {
    return this.#setPlayerById.asReadonly();
  }

  #setPlayerStatisticsSeason = signal<Statistics | null>(null);
  get getPlayerStatisticsSeason() {
    return this.#setPlayerStatisticsSeason.asReadonly();
  }

  public getSeason = this.careerService.getSeason;
  public getCareerDetails = this.careerService.getCareerDetails;
  public seasons = this.careerService.getAllSeasonsByCareer;


  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(this.handleRouteParams);
    this.fetchPlayerData();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSelectionChange(event: MatOptionSelectionChange): void {
    const selectedValue = event.source.value;
    this.router.navigate([`/career/${this.idCareer()}/${selectedValue}/${this.id()}/edit-player`]);
    this.ngOnInit();
  }

  private handleRouteParams = (params: Params): void => {
    this.id.set(params['id']);
    if (isValidTypeSeasonKey(params['season']) || params['season'] === 'geral') {
      this.season.set(params['season']);
    }
  };

  private fetchPlayerData(): void {
    if (!this.id()) return;

    const id = this.id()!;
    this.subscriptions.push(
      this.playerService.httpGetPlayerById$(id).subscribe({
        next: res => {
          this.idCareer.set(res.idCareer);
          this.#setPlayerById.set(res);
          this.loadSeasonData();
        },
      })
    );
  }



  private loadSeasonData(): void {
    if (!this.idCareer() || !this.season()) return;

    this.subscriptions.push(
      this.careerService.httpSeasonByCareer$(this.idCareer()!, this.season()!).subscribe({
        next: season => this.seasonObj.set(season),
      })
    );

    this.subscriptions.push(
      this.playerService
        .httpFindPlayerStatisticsBySeason$(this.id()!, this.season()!)
        .subscribe({
          next: (res) => {
            this.#setPlayerStatisticsSeason.set(res);
          },
          error: () => this.#setPlayerStatisticsSeason.set(null)
        })
    )
    this.subscriptions.push(
      this.careerService
        .httpCareersById$(this.idCareer()!)
        .subscribe()
    )
    this.subscriptions.push(
      this.careerService
        .httpSeasonsByCareer$(this.idCareer()!)
        .subscribe()
    )
  }

  public openModalRemovePlayerInSeason(): void {
    this.modalService.showConfirmation(
      'Atenção!',
      `Tem certeza que deseja remover esse jogador da ${transformSeasonString(this.season()!)}`,
      'Sim',
      'Não'
    );

    this.modalService.confirmState().subscribe(confirmed => {
      if (confirmed && this.seasonObj()) {
        this.removePlayerFromSeason(this.seasonObj()!.id!, this.id()!);
      }
    });
  }

  private async removePlayerFromSeason(seasonId: string, playerId: string): Promise<void> {
    try {
      await this.seasonService.httpRemovePlayerFromSeason(seasonId, playerId);
      this.router.navigateByUrl(`/career/${this.idCareer()}/${this.season()}`);
      this.snackBar.open('Jogador removido da temporada com sucesso!', 'Fechar', { duration: 3500 });
    } catch (err: any) {
      this.modalService.showError(err.error.message);
    }
  }
}
