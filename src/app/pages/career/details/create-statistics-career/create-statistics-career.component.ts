import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink, UrlSegment } from '@angular/router';
import { DetailsManagerClubIconComponent } from '../../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { FileUploadModule } from '../../../../shared/components/file-upload/file-upload.module';
import { LoaderModule } from '../../../../shared/components/loader/loader.module';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { UpperCaseDirective } from '../../../../shared/directives/upper-case.directive';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CareerService } from '../../../services/career.service';
import { CoachService } from '../../../services/coach.service';
import { ModalService } from '../../../services/modal.service';
import { NationService } from '../../../services/nation.service';
import { PlayerService } from '../../../services/player.service';
import { transformSeasonString } from '../../../../shared/utils/utils';
import { NewCareer } from '../../../../models/career/new-career';
import { Season } from '../../../../models/career/season';
import { SeasonService } from '../../../services/season.service';

@Component({
  selector: 'phub-create-statistics-career',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgFor,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    UpperCaseDirective,
    RouterLink,
    ModalComponent,
    LoaderModule,
    FileUploadModule,
    DetailsManagerClubIconComponent,
  ],
  templateUrl: './create-statistics-career.component.html',
  styleUrl: './create-statistics-career.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateStatisticsCareerComponent implements OnInit {
  #fb = inject(FormBuilder);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #snackBar = inject(MatSnackBar);

  #modalService = inject(ModalService);
  #careerService = inject(CareerService);
  #seasonService = inject(SeasonService);

  public season = signal<string>('');
  public id = signal<string>('');
  public pathAlias = signal<string>('');
  public formStatistics!: FormGroup;
  public showSeason = transformSeasonString;

  #setCareerDetails = signal<NewCareer | null>(null);
  get getCareerDetails() {
    return this.#setCareerDetails.asReadonly();
  }

  #setSeason = signal<Season | null>(null);
  get getSeason() {
    return this.#setSeason.asReadonly();
  }

  ngOnInit(): void {

    this.#activatedRoute.url.subscribe({
      next: (url: UrlSegment[]) => {
        const path = url.map((segment) => segment.path).join('/');
        if (path.includes('new-statistics')) {
          this.pathAlias.set('create');
        } else if (path.includes('edit-statistics')) {
          this.pathAlias.set('edit');
        } else {
          this.pathAlias.set('unknown');
        }
      },
    });

    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        console.log(params);
        this.season.set(params['season']);
        this.id.set(params['id']);
      },
    });

    this.formStatistics = this.#fb.group({
      games: [0 ,[Validators.required]],
      wins: [
        0,
        [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
      ],
      draws: [0, Validators.required],
      losses: [0, Validators.required],
      goalsConceded: [0, Validators.required],
      goalsScored: [0, Validators.required],
      titles: [[]]
    });

    this.#careerService.httpCareersById$(this.id()).subscribe({
      next: (career) => this.#setCareerDetails.set(career)
    });
    this.#careerService.httpSeasonByCareer$(this.id(), this.season()).subscribe({
      next: (season) => {
        this.#setSeason.set(season)
        this.formStatistics.patchValue({
          games: season.games,
          wins: season.wins,
          draws: season.draws,
          losses: season.losses,
          goalsConceded: season.goalsConceded,
          goalsScored: season.goalsScored
        });
      }
    });
  }

  public async submitForm(seasonId: string) {
    await this.updateSeason(seasonId, this.formStatistics.value).then(() => {
      this.#router.navigateByUrl(`/career/${this.id()}/${this.season()}`);
      this.#snackBar.open('Temporada atualizada com sucesso!', 'Fechar', {
        duration: 3500,
      });
    });
  }

  async updateSeason(seasonId: string, season: Partial<Season>) {
    try {
      await this.#seasonService.httpUpdateSeason(seasonId, season);
    } catch (err: any) {
      this.#modalService.showError(err.error.message);
    }
  }

}
