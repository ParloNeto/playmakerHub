import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NationService } from '../services/nation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CareerService } from '../services/career.service';
import { UpperCaseDirective } from '../../shared/directives/upper-case.directive';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewCareer } from '../../models/career/new-career';
import { ModalService } from '../services/modal.service';
import { CoachService } from '../services/coach.service';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-creating-career',
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
  ],
  templateUrl: './creating-career.component.html',
  styleUrl: './creating-career.component.scss',
})
export class CreatingCareerComponent implements OnInit, OnDestroy {

  #fb = inject(FormBuilder);
  #nationService = inject(NationService);
  #careerService = inject(CareerService);
  #coachService = inject(CoachService);
  #snackBar = inject(MatSnackBar);
  #modalService = inject(ModalService);
  #router = inject(Router);

  public formCreatingCareer!: FormGroup;
  public formCreatingCoach!: FormGroup;

  private getAllNations: Subscription = this.#nationService.getAllNationsMock().subscribe();
  private getAllFootballLeagues: Subscription = this.#careerService.httpFootballLeagues$().subscribe();
  private getAllVersionFifa: Subscription = this.#careerService.httpVersionFifa$().subscribe();

  public showError = signal<boolean>(false);
  public messageError = signal<string>('');
  titleModal!: 'Aviso!' | 'Sucesso!' | 'Erro!';

  public searchQueryNation = signal<string>('');
  public searchQueryFifaVersion = signal<string>('');
  public searchQueryLeagueCareer = signal<string>('');
  public searchQueryTeamCareer = signal<string>('');

  public filteredOptions: string[] = [];

  ngOnInit(): void {
    this.getAllNations;
    this.getAllFootballLeagues;
    this.getAllVersionFifa;

    this.formCreatingCareer = this.#fb.group({
      fifaCareer: [
        null,
        [Validators.required, Validators.maxLength(8), Validators.minLength(7)],
      ],
      leagueCareer: [
        null,
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(6),
        ],
      ],
      teamCareer: [null, Validators.required],
    });

    this.formCreatingCoach = this.#fb.group({
      coachesName: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      nationality: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      urlImageCoach: [null, [Validators.required]],
      seasons: [0, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.getAllNations.unsubscribe();
    this.getAllFootballLeagues.unsubscribe();
  }

  get getUrl() {
    return this.formCreatingCoach.get('urlImageCoach')!.value;
  }

  get getCoachesName() {
    return this.formCreatingCoach.get('coachesName')!.value;
  }

  get getNationality() {
    return this.formCreatingCoach.get('nationality')!.value;
  }

  get getLeagueCareer() {
    return this.formCreatingCareer.get('leagueCareer')!.value;
  }

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

  /**
   * Filtra a versão do fifa com base no input do campo 'fifaCareer'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */
  public fifaVersion = computed(() => {
    const sq = this.searchQueryFifaVersion();
    return this.#careerService
      .getFifaCareer()!
      .filter((fifaVersion) => fifaVersion.includes(sq));
  });

  /**
   * Filtra a liga com base no input do campo 'leagueCareer'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */
  public leagues = computed(() => {
    const sq = this.searchQueryLeagueCareer();
    return this.#careerService
      .getFootballLeagues()!
      .filter((league) => league.name.includes(sq));
  });

  /**
   * Adiciona os times em um array com base na liga selecionada.
   *
   * @returns {string} Retorna um array com os nomes dos times da liga selecionada.
   */
  public selectedTeamsFilteredByLeague = computed(() => {
    const sq = this.searchQueryLeagueCareer();
    return this.leagues()
      .filter((league) => league.name == sq)
      .map((res) => (this.filteredOptions = res.teams.slice()));
  });

  public submitForm(): void {
    this.checkFieldValues();

    if (this.formCreatingCareer.valid && this.formCreatingCoach.valid) {
      const careerForm = this.formCreatingCareer.value;
      const coachForm = this.formCreatingCoach.value;

      this.#coachService.createCoach(coachForm).subscribe({
        next: (createdCoach) => {
          const finalForm: NewCareer = {
            coach: createdCoach,
            fifaCareer: careerForm.fifaCareer,
            leagueCareer: careerForm.leagueCareer,
            teamCareer: careerForm.teamCareer,
          };
          this.#careerService.httpPostCareer$(finalForm).subscribe({
            next: () => {
              this.#router.navigateByUrl(`/home`);
              this.#snackBar.open('Carreira criada com sucesso!', 'Fechar', {
                duration: 3500,
              });
            },
          });
        },
        error: (err: Error) => {
          this.titleModal = 'Erro!';
          this.#modalService.showError(err.message);
        },
      });
    }
  }

  public checkFieldValues(): void {
    const existLeague = this.leagues();
    const existNation = this.nations();
    if (existLeague.length != 0) {
      console.log(existLeague);
      console.log('existe array');
    } else {
      this.formCreatingCareer.get('leagueCareer')!.reset();
      this.messageError.set('O nome no campo da Liga não existe.');
      this.showError.set(true);
      this.setTimeRemoveMessageError(false, 5000);
    }

    if (existNation.length != 0) {
      console.log(existNation);
      console.log('existe nartion');
    } else {
      this.formCreatingCareer.get('nationality')!.reset();
      console.log('O nome no campo de Nação não existe.');
      this.messageError.set('O nome no campo de Nação não existe.');
      this.showError.set(true);
      this.setTimeRemoveMessageError(false, 5000);
    }
  }

  public onSearchUpdatedNation(nationName: string) {
    this.searchQueryNation.set(nationName);
  }

  public onSearchUpdatedFifaVersion(sq: string) {
    this.searchQueryFifaVersion.set(sq);
  }

  public onSearchUpdatedLeagueCareer(sq: string) {
    this.searchQueryLeagueCareer.set(sq);
  }

  public formatWithHyphenAndLowerCase(field: string): string {
    const formattedName = field.trim().toLowerCase();

    const dashedName = formattedName.replace(/\s+/g, '-');
    return dashedName;
  }

  private changeValueForm(league: string, nation: string) {
    this.formCreatingCoach.get('nationality')!.setValue(nation);
    this.formCreatingCareer.get('leagueCareer')!.setValue(league);
  }

  private setTimeRemoveMessageError(showError: boolean, time: number): void {
    setTimeout(() => {
      this.showError.set(showError);
    }, time);
  }
}
