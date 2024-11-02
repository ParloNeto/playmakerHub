import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
import { Coach } from '../../models/career/Coach';
import { FootballLeague } from '../../models/footballLeagues/footballLeagues';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { FileUploadModule } from '../../shared/components/file-upload/file-upload.module';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { Team } from '../../models/footballLeagues/team';

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
    LoaderModule,
    FileUploadModule,
    DetailsManagerClubIconComponent
  ],
  templateUrl: './creating-career.component.html',
  styleUrl: './creating-career.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatingCareerComponent implements OnInit {
  #fb = inject(FormBuilder);
  #nationService = inject(NationService);
  #careerService = inject(CareerService);
  #coachService = inject(CoachService);
  #snackBar = inject(MatSnackBar);
  #modalService = inject(ModalService);
  #router = inject(Router);

  public formCreatingCareer!: FormGroup;
  public formCreatingCoach!: FormGroup;

  public showError = signal<boolean>(false);
  public messageError = signal<string>('');

  public searchQueryNation = signal<string>('');
  public searchQueryFifaVersion = signal<string>('');
  public searchQueryLeagueCareer = signal<string>('');

  public filteredOptions: Team[] = [];

  #setFootballLeague = signal<FootballLeague[] | null>(null);
  get getFootballLeague() {
    return this.#setFootballLeague.asReadonly();
  }

  #setNations = signal<{ nation: string }[] | null>(null);
  get getNations() {
    return this.#setNations.asReadonly();
  }

  #setFifaCareer = signal<string[] | null>(null);
  get getFifaCareer() {
    return this.#setFifaCareer.asReadonly();
  }

  ngOnInit(): void {

    this.getVersionsFifa().then();
    this.getNationsMock().then();
    this.getFootballLeagues().then();

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
          Validators.minLength(3),
        ],
      ],
      teamCareer: [null, Validators.required],
    });

    this.formCreatingCoach = this.#fb.group({
      coachesName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      nationality: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      urlImageCoach: [''],
      seasons: [0, [Validators.required]],
    });
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

  get getTeamCareer() {
    return this.formCreatingCareer.get('teamCareer')!.value;
  }

  /**
   * Filtra a nacionalidade com base no input do campo 'nationality'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */

  public nations = computed(() => {
    const sq = this.searchQueryNation();
    const nations = this.getNations();

    if (nations) {
      return nations!.filter((x) => x.nation.includes(sq));
    }

    return null;
  });

  /**
   * Filtra a versão do fifa com base no input do campo 'fifaCareer'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */
  public fifaVersion = computed(() => {
    const sq = this.searchQueryFifaVersion();
    const fifaCareer = this.getFifaCareer();
    if (fifaCareer) {
      return fifaCareer!.filter((fifaVersion) => fifaVersion.includes(sq));
    }
    return null;
  });

  /**
   * Filtra a liga com base no input do campo 'leagueCareer'.
   *
   * @returns {string} Retorna um array filtrado com o nome passado no input.
   */
  public leagues = computed(() => {
    const sq = this.searchQueryLeagueCareer();
    const footballLeagues = this.getFootballLeague();
    if (footballLeagues) {
      return footballLeagues.filter((league) => league.name.includes(sq));
    }
    return null;
  });

  /**
   * Adiciona os times em um array com base na liga selecionada.
   *
   * @returns {string} Retorna um array com os nomes dos times da liga selecionada.
   */
  public selectedTeamsFilteredByLeague = computed(() => {
    const sq = this.searchQueryLeagueCareer();
    const leagues = this.leagues();
    if (leagues) {
      leagues
        .filter((league) => league.name == sq)
        .map((res) => (this.filteredOptions = res.teams.slice()));
    }
    return null;
  });

  public async submitForm(): Promise<void> {
    if (this.formCreatingCareer.valid && this.formCreatingCoach.valid) {
      const careerForm = this.formCreatingCareer.value;
      const coachForm = this.formCreatingCoach.value;

      const finalForm: NewCareer = {
        coach: coachForm,
        fifaCareer: careerForm.fifaCareer,
        leagueCareer: careerForm.leagueCareer,
        teamCareer: careerForm.teamCareer,
      };

      await this.createCareer(finalForm).then(() => {
        this.#router.navigateByUrl(`/home`);
        this.#snackBar.open('Carreira criada com sucesso!', 'Fechar', {
          duration: 3500,
        });
      });
    }
  }

  async createCoach(coach: Partial<Coach>) {
    try {
      const response = await this.#coachService.httpCreateCoach(coach);
      return response;
    } catch (err: any) {
      console.error(err);
      this.#modalService.showError(err.error.message);
    }
    return undefined;
  }

  async createCareer(career: Partial<NewCareer>) {
    try {
      await this.#careerService.httpPostCareer(career);
    } catch (err: any) {
      this.#modalService.showError(err.error.message);
    }
  }

  async getFootballLeagues(): Promise<void> {
    try {
      const footballLeagues = await this.#careerService.httpFootballLeagues();
      this.#setFootballLeague.set(footballLeagues);
    } catch (err) {
      console.error(err);
    }
  }

  async getNationsMock(): Promise<void> {
    try {
      const nations = await this.#nationService.getAllNationsMock();
      this.#setNations.set(nations);
    } catch (err) {
      console.error(err);
    }
  }

  async getVersionsFifa(): Promise<void> {
    try {
      const versionsFifa = await this.#careerService.httpVersionFifa();
      this.#setFifaCareer.set(versionsFifa);
    } catch (err) {
      console.error(err);
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
}
