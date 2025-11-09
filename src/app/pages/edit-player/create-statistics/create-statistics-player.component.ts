import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { DetailsManagerClubIconComponent } from '../../../shared/components/details-manager-club/details-manager-club-icon.component';
import { FileUploadModule } from '../../../shared/components/file-upload/file-upload.module';
import { LoaderModule } from '../../../shared/components/loader/loader.module';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { UpperCaseDirective } from '../../../shared/directives/upper-case.directive';
import { HeaderComponent } from '../../../shared/header/header.component';
import { transformSeasonString } from '../../../shared/utils/utils';
import { ClearOnFocusDirective } from '../../../shared/directives/clear-on-focus.directive';
import { PlayerService } from '../../services/player.service';
import { ModalService } from '../../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Statistics } from '../../../models/player/statistics';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Player } from '../../../models/player/player';

@Component({
    selector: 'phub-create-statistics-player',
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
        ClearOnFocusDirective,
    ],
    templateUrl: './create-statistics-player.component.html',
    styleUrl: './create-statistics-player.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateStatisticsPlayerComponent implements OnInit {
  #fb = inject(FormBuilder);
  #activatedRoute = inject(ActivatedRoute);
  #playerService = inject(PlayerService);
  #modalService = inject(ModalService);
  #router = inject(Router);
  #snackBar = inject(MatSnackBar);

  public season = signal<string>('');
  public id = signal<string>('');
  public idCareer = signal<string>('');
  public pathAlias = signal<string>('');

  #setPlayerById = signal<Player | null>(null);
  get getPlayerById() {
    return this.#setPlayerById.asReadonly();
  }

  public showSeason = transformSeasonString;
  public formStatistics!: FormGroup;

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
      season: [this.season(), [Validators.required]],
      matches: [
        null,
        [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
      ],
      goals: [null, Validators.required],
      assists: [null, Validators.required],
      yellowCards: [0, Validators.required],
      redCards: [0, Validators.required],
      contractedAtualSeason: [false],
    });

    this.#playerService.httpGetPlayerById$(this.id()).subscribe({
      next: (player: Player) => {
        this.idCareer.set(player.idCareer);
        this.#setPlayerById.set(player);
      }
    });

    if (this.pathAlias() === 'edit') {
      this.#playerService.httpFindPlayerStatisticsBySeason$(this.id(), this.season()).subscribe({
        next: (statistics) => {
          this.formStatistics.patchValue({
            matches: statistics.matches,
            goals: statistics.goals,
            assists: statistics.assists,
            yellowCards: statistics.yellowCards,
            redCards: statistics.redCards
          });
        }
      });
    }

  }

  public submitForm(): void {
    const data = this.formStatistics.value;

    if (this.pathAlias() === 'create') {
      this.#playerService
      .httpCreateStatisticsSeasonPlayer$(this.id(), data)
      .subscribe({
        next: () => {
          // this.#modalService.showSuccess();
          this.#router.navigateByUrl(`/career/${this.idCareer()}/${this.season()}/${this.id()}/edit-player`);
          this.#snackBar.open('Estatísticas criadas com sucesso!', 'Fechar', {
            duration: 3500,
      });
        },
        error: (bodyErr: HttpErrorResponse) => {
          this.#modalService.showError(bodyErr.error.message);
        },
      });
    } else if (this.pathAlias() === 'edit') {
      this.#playerService
      .httpUpdateStatisticsSeasonPlayer$(this.id(), data)
      .subscribe({
        next: () => {
          this.#router.navigateByUrl(`/career/${this.idCareer()}/${this.season()}/${this.id()}/edit-player`);
          this.#snackBar.open('Estatísticas atualizadas com sucesso!', 'Fechar', {
            duration: 3500,
      });
        },
        error: (bodyErr: HttpErrorResponse) => {
          this.#modalService.showError(bodyErr.error.message);
        },
      });
    }

  }
}
