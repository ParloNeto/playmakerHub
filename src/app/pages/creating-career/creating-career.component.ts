import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  computed,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NationService } from '../services/nation.service';
import { CareerService } from '../services/career.service';
import { ModalService } from '../services/modal.service';
import { CoachService } from '../services/coach.service';
import { NewCareer } from '../../models/career/new-career';
import { FootballLeague, Team } from '../../models/footballLeagues/footballLeagues';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { FileUploadModule } from '../../shared/components/file-upload/file-upload.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { UpperCaseDirective } from '../../shared/directives/upper-case.directive';
import { HeaderComponent } from '../../shared/header/header.component';

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
    DetailsManagerClubIconComponent,
    MatRadioModule
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

  formCreatingCareer!: FormGroup;
  formCreatingCoach!: FormGroup;
  selectedOptionCoachImage!: string;
  showError = signal<boolean>(false);
  messageError = signal<string>('');

  searchQueryNation = signal<string>('');
  searchQueryFifaVersion = signal<string>('');
  searchQueryLeagueCareer = signal<string>('');
  filteredOptions: Team[] = [];

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

  ngOnInit(): void {
    this.initForms();
    this.loadInitialData();
  }

  private initForms() {
    this.formCreatingCareer = this.#fb.group({
      fifaCareer: [
        null,
        [Validators.required, Validators.maxLength(8), Validators.minLength(7)],
      ],
      leagueCareer: [
        null,
        [Validators.required, Validators.maxLength(16), Validators.minLength(3)],
      ],
      teamCareer: [null, Validators.required],
    });

    this.formCreatingCoach = this.#fb.group({
      coachesName: [
        '',
        [Validators.required, Validators.maxLength(20), Validators.minLength(3)],
      ],
      nationality: [
        null,
        [Validators.required, Validators.maxLength(20), Validators.minLength(3)],
      ],
      urlImageCoach: [''],
      seasons: [0, Validators.required],
    });
  }

  private async loadInitialData() {
    await Promise.all([this.getVersionsFifa(), this.getNationsMock(), this.getFootballLeagues()]);
  }

  public nations = computed(() => {
    return this.getNations()?.filter(x => x.nation.includes(this.searchQueryNation())) || null;
  });

  public fifaVersion = computed(() => {
    return this.getFifaCareer()?.filter(v => v.includes(this.searchQueryFifaVersion())) || null;
  });

  public leagues = computed(() => {
    return this.getFootballLeague()?.filter(l => l.name.includes(this.searchQueryLeagueCareer())) || null;
  });

  public selectedTeamsFilteredByLeague = computed(() => {
    const league = this.leagues()!.find(league => league.name === this.searchQueryLeagueCareer());
    this.filteredOptions = league?.teams || [];
  });

  async submitForm(): Promise<void> {
    if (this.formCreatingCareer.valid && this.formCreatingCoach.valid) {
      const finalForm: NewCareer = {
        coach: this.formCreatingCoach.value,
        fifaCareer: this.formCreatingCareer.value.fifaCareer,
        leagueCareer: this.formCreatingCareer.value.leagueCareer,
        teamCareer: this.formCreatingCareer.value.teamCareer,
      };

      try {
        await this.createCareer(finalForm);
        this.#router.navigateByUrl(`/home`);
        this.#snackBar.open('Carreira criada com sucesso!', 'Fechar', { duration: 3500 });
      } catch (err: any) {
        this.#modalService.showError(err.error.message);
      }
    }
  }

  private async createCareer(career: Partial<NewCareer>) {
    try {
      await this.#careerService.httpPostCareer(career);
    } catch (err: any) {
      this.#modalService.showError(err.error.message);
    }
  }

  private async getFootballLeagues() {
    const leagues = await this.#careerService.httpFootballLeagues();
    this.#setFootballLeague.set(leagues);
  }

  private async getNationsMock() {
    const nations = await this.#nationService.getAllNationsMock();
    this.#setNations.set(nations);
  }

  private async getVersionsFifa() {
    const versions = await this.#careerService.httpVersionFifa();
    this.#setFifaCareer.set(versions);
  }

  onSearchUpdatedNation(value: string) {
    this.searchQueryNation.set(value);
  }

  onSearchUpdatedFifaVersion(value: string) {
    this.searchQueryFifaVersion.set(value);
  }

  onSearchUpdatedLeagueCareer(value: string) {
    this.searchQueryLeagueCareer.set(value);
  }
}
