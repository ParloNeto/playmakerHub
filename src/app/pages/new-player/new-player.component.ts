import { Player } from './../../models/player/player';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { UpperCaseDirective } from '../../shared/directives/upper-case.directive';
import { HeaderComponent } from '../../shared/header/header.component';
import { NationService } from '../services/nation.service';
import { CareerService } from '../services/career.service';
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { PlayerService } from '../services/player.service';
import { ModalService } from '../services/modal.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FileUploadModule } from '../../shared/components/file-upload/file-upload.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';

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
    ModalComponent,
    FileUploadModule,
    LoaderModule
  ],
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlayerComponent implements OnInit {
  #fb = inject(FormBuilder);
  #careerService = inject(CareerService);
  #nationService = inject(NationService);
  #playerService = inject(PlayerService);
  #modalService = inject(ModalService);

  #activatedRoute = inject(ActivatedRoute);

  public getCareerDetails = this.#careerService.getCareerDetails;

  public formNewPlayer!: FormGroup;
  public formStatisticsNewPlayer!: FormGroup;
  public searchQueryNation = signal<string>('');
  public season = signal<string>('');
  public idCareer = signal<string>('');



  #setNations = signal<{ nation: string }[] | null>(null);
  get getNations() {
    return this.#setNations.asReadonly();
  }

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.season.set(params['season']);
        this.idCareer.set(params['id']);

        // this.#careerService.httpCareersById$(id).subscribe();
      },
    });

    this.formNewPlayer = this.#fb.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      nationality: ['', [Validators.required]],
      position: [
        null,
        [Validators.required],
      ],
      joined: [
        2017,
        [Validators.required],
      ],
      kitNumber: [10, [Validators.required]],
      urlImagePlayer: ['', [Validators.required]],
    });

    this.formStatisticsNewPlayer = this.#fb.group({
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
      ]
    });

    this.verifySeason(this.season());
    this.getNationsMock().then()
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
      return nations.filter((x) => x.nation.includes(sq));
    }
    return null;
  });

  public verifySeason(typeSeason: string) {
    if (typeSeason === 'geral') {
      // this.formNewPlayer.get('contractedAtualSeason')?.setValue()
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
    console.log(this.formNewPlayer.value);
  }

  public onSearchUpdatedNation(nationName: string) {
    this.searchQueryNation.set(nationName);
  }
}
