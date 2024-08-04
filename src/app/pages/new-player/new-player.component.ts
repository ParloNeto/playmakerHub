import { Player } from './../../models/player/player';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UpperCaseDirective } from '../../shared/directives/upper-case.directive';
import { HeaderComponent } from '../../shared/header/header.component';
import { NationService } from '../services/nation.service';
import { CareerService } from '../services/career.service';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { PlayerService } from '../services/player.service';
import { ModalService } from '../services/modal.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-player',
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
    DetailsManagerClubIconComponent,
    ModalComponent
  ],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPlayerComponent implements OnInit {
  #fb = inject(FormBuilder);
  #careerService = inject(CareerService);
  #nationService = inject(NationService);
  #playerService = inject(PlayerService);
  #modalService = inject(ModalService);
  #snackBar = inject(MatSnackBar);
  #router = inject(Router);


  #activatedRoute = inject(ActivatedRoute);

  public getCareerDetails = this.#careerService.getCareerDetails;

  public formNewPlayer!: FormGroup;
  public formStatisticsNewPlayer!: FormGroup;
  public searchQueryNation = signal<string>('');
  public season = signal<string>('');
  public idCareer = signal<string>('');
  public titleModal = this.#playerService.titleModal;
  // public idCareer!: string;

  /**
   * Filtra a nacionalidade com base no input do campo 'nationality'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */

  public nations = computed(() => {
    const sq = this.searchQueryNation();
    return this.#nationService
      .getNations()!
      .filter((x) => x.nation.includes(sq));
  });

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.season.set(params['season']);
        this.idCareer.set(params['id']);

        // this.#careerService.httpCareersById$(id).subscribe();
      },
    });
    this.#nationService.getAllNationsMock().subscribe();

    this.formNewPlayer = this.#fb.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      nationality: ['', [Validators.minLength(3), Validators.required]],
      position: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      joined: [
        0,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      kitNumber: [0, [Validators.required]],
      urlImagePlayer: ['', [Validators.required]],
      idCareer: [this.idCareer(), [Validators.required]],
    });

    this.formStatisticsNewPlayer = this.#fb.group({
      season: [this.season()],
      matches: [0, [Validators.required]],
      goals: [0, [Validators.required]],
      assists: [0, [Validators.required]],
      yellowCards: [
        0,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      redCards: [
        0,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      contractedAtualSeason: [, [Validators.required]],
    });

    this.verifySeason(this.season());
  }
  public verifySeason(typeSeason: string) {
    if (typeSeason === 'geral') {
      // this.formNewPlayer.get('contractedAtualSeason')?.setValue()
    }
  }

  public submitForm() {
    // if (this.formNewPlayer.get('contractedAtualSeason')!.value === true) {
    //   this.formNewPlayer.get('season')?.setValue(this.season());
    // }

    if (this.formNewPlayer.valid && this.formStatisticsNewPlayer.valid) {
      const player = Object.assign({}, this.formNewPlayer.value, {
        statisticsBySeasons: [this.formStatisticsNewPlayer.value],
      }) as Player;

      this.#playerService
        .httpCreatePlayerByCareer$(this.idCareer(), player, this.season())
        .subscribe();
    }
    console.log(this.formNewPlayer.valid);
  }

  public onSearchUpdatedNation(nationName: string) {
    this.searchQueryNation.set(nationName);
  }
}
