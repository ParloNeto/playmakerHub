import { StringUtils, transformSeasonString } from './../../shared/utils/utils';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CareerService } from '../services/career.service';
import { getInitialSeasonByFIFAVersion } from '../services/mocks/fifaVersion-mocks';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../services/modal.service';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { NewCareer } from '../../models/career/new-career';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { Top3StatsPlayersCareerComponent } from '../../shared/components/top-3-stats-players-career/top-3-stats-players-career.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-career',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    DetailsManagerClubIconComponent,
    ModalComponent,
    LoaderModule,
    Top3StatsPlayersCareerComponent,
    FormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerComponent implements OnInit, OnDestroy {
  #careerService = inject(CareerService);
  #modalService = inject(ModalService);
  #snackBar = inject(MatSnackBar);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  private id!: string;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public seasons = this.#careerService.getAllSeasonsByCareer;
  public showSeason = transformSeasonString;
  private confirmSubscription!: Subscription;


  #setCareerDetails = signal<NewCareer | null>(null);
    get getCareerDetails() {
      return this.#setCareerDetails.asReadonly();
    }

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id = params['id'];
        this.#careerService.httpSeasonsByCareer$(this.id).subscribe();
        this.#careerService.httpCareersById$(this.id).subscribe({
          next: (career: NewCareer) => {
            this.#setCareerDetails.set(career);
            this.#careerService
              .httpSeasonByInitialSeason$(career.fifaCareer)
              .subscribe();
          },
        });
      },
    });
  }

  ngOnDestroy() {
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }
  }

  public openModalConfirmation(): void {
    this.#modalService.showConfirmation(
      'Atenção!',
      'Tem certeza que deseja deletar essa carreira?',
      'Sim',
      'Não'
    );
    this.#modalService.confirmState().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteCareer();
      } else {
        return;
      }
    });
  }

  public formatSeason(fifaCareer: string): string {
    const initialSeason = getInitialSeasonByFIFAVersion(fifaCareer);
    const strippedSeason = initialSeason
      .replace('Temporada ', '')
      .replace('/', '-');
    const formattedSeason = 'temporada-' + strippedSeason;
    return formattedSeason;
  }

  public deleteCareer(): void {
    this.#careerService.httpDeleteCareer$(this.id).subscribe({
      next: () => {
        this.#router.navigateByUrl(`/home`);
        this.#snackBar.open('Carreira removida com sucesso!', 'Fechar', {
          duration: 3500,
        });
      },
      error: (err) => {
        this.#modalService.showError(err);
      }
    });
  }
}
