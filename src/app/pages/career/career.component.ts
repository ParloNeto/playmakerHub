import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { transformSeasonString } from '../../shared/utils/utils';
import { IconPlayerComponent } from '../../shared/components/icon-player/icon-player.component';
@Component({
  selector: 'app-career',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterLink,
    DetailsManagerClubIconComponent,
    ModalComponent,
  ],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit, OnDestroy {
  #careerService = inject(CareerService);
  #modalService = inject(ModalService);
  #snackBar = inject(MatSnackBar);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  private id!: string;
  public getCareerDetails = this.#careerService.getCareerDetails;
  public initialSeason = this.#careerService.getSeasonByInitialSeason;
  public seasons = this.#careerService.getAllSeasonsByCareer;
  public showSeason = transformSeasonString


  private confirmSubscription!: Subscription;

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id = params['id'];
        this.#careerService.httpSeasonsByCareer$(this.id).subscribe();
        this.#careerService.httpCareersById$(this.id).subscribe({
          next: (career: NewCareer) => {
            this.#careerService.httpSeasonByInitialSeason$(career.fifaCareer).subscribe();
          }
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
    this.subscribeToConfirm(
      () => {
        console.log('User confirmed the action.');
        this.deleteCareer();
      },
      () => {
        console.log('User cancelled the action.');
      }
    );
    this.#modalService.showConfirmation(
      'Tem certeza que deseja deletar essa carreira?',
      'Sim',
      'Não'
    );
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
    });
  }

  private subscribeToConfirm(onConfirm: () => void, onCancel: () => void) {
    if (this.confirmSubscription) {
      this.confirmSubscription.unsubscribe();
    }
    this.confirmSubscription = this.#modalService.confirmState$.subscribe(
      (isConfirmed) => {
        if (isConfirmed) {
          onConfirm();
        } else {
          onCancel();
        }
      }
    );
  }
}
