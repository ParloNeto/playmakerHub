import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
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
import { DetailsManagerClubIconComponent } from '../../shared/components/details-manager-club/details-manager-club-icon.component';
import { UpperCaseDirective } from '../../shared/directives/upper-case.directive';
import { CareerComponent } from '../career/career.component';
import { CareerService } from '../services/career.service';
import { SeasonService } from '../services/season.service';
import { Season } from '../../models/career/season';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../services/modal.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'phub-new-season',
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
  templateUrl: './new-season.component.html',
  styleUrl: './new-season.component.scss',
})
export class NewSeasonComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #careerService = inject(CareerService);
  #modalService = inject(ModalService);
  #snackBar = inject(MatSnackBar);
  #seasonService = inject(SeasonService);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  public searchQuerySeasonName = signal<string>('');
  public titleModal = signal<string>('');
  public id = signal<string>('');
  public formSeason!: FormGroup;
  public getCareerDetails = this.#careerService.getCareerDetails;
  public getSeasons = this.#seasonService.getSeasons;

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id.set(params['id']);
      },
    });

    this.#careerService.httpCareersById$(this.id()).subscribe();
    this.#seasonService.httpGetAllSeasons().subscribe();

    this.formSeason = this.#fb.group({
      seasonName: ['', [Validators.required, Validators.maxLength(15)]],
      games: [0, [Validators.maxLength(3)]],
      wins: [0, [Validators.maxLength(3)]],
      draws: [0, [Validators.maxLength(3)]],
      losses: [0, [Validators.maxLength(3)]],
      goalsConceded: [0, [Validators.maxLength(3)]],
      goalsScored: [0, [Validators.maxLength(3)]],
      titles: [[{titleName: "Titulo"}], [Validators.required]],
    });
  }

  public submitForm(): void {
    if (this.formSeason.valid) {
      this.#careerService
        .httpPostSeasonByCareerId$(this.formSeason.value, this.id())
        .subscribe({
          next: (res: Season) => {
            this.#router.navigateByUrl(`career/${this.id()}`);
            this.#snackBar.open('Temporada criada com sucesso!', 'Fechar', {
              duration: 3500,
            });
          },
          error: (bodyErr: HttpErrorResponse) => {
            this.titleModal.set("Erro!")
            this.#modalService.showError(bodyErr.error.message);
            console.log(bodyErr.error.message);
          },
        });
    }
  }

  public onSearchUpdatedSeasonName(nationName: string) {
    this.searchQuerySeasonName.set(nationName);
  }

  public transformSeasonString(input: string): string {
    const parts = input.split('-');

    if (parts.length !== 3 || parts[0].toLowerCase() !== 'temporada') {
      throw new Error('Formato inválido');
    }

    const season = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const year1 = parts[1];
    const year2 = parts[2];

    return `${season} ${year1}/${year2}`;
  }
}
