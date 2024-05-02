import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import {
  FormBuilder,
  FormControl,
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
import { CareerComponent } from '../career/career.component';
import { CareerService } from '../services/career.service';

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
  ],
  templateUrl: './creating-career.component.html',
  styleUrl: './creating-career.component.scss',
})
export class CreatingCareerComponent implements OnInit {

  #fb = inject(FormBuilder);
  #nationService = inject(NationService);
  #careerService = inject(CareerService);
  formCreatingCareer!: FormGroup;

  searchQueryNation = signal<string>('');
  searchQueryFifaVersion = signal<string>('');

  nations = computed(() => {
    const sq = this.searchQueryNation();
    return this.#nationService
      .getNations()!
      .filter((x) => x.nation.includes(sq));
  });

  fifaVersion = computed(() => {
    const sq = this.searchQueryFifaVersion();
    return this.#careerService
      .getFifaCareer()!
      .filter((fifaVersion) => fifaVersion.includes(sq));
  });

  ngOnInit(): void {
    this.#nationService.getAllNationsMock().subscribe();
    this.formCreatingCareer = this.#fb.group({
      fifaCareer: ['', Validators.required],
      teamCareer: ['', Validators.required],
      coachsName: ['', Validators.required],
      nationality: ['', Validators.required],
      urlImageCoach: ['', Validators.required],
    });
  }
  
  get getUrl() {
    return this.formCreatingCareer.get('urlImageCoach')!.value;
  }

  get getCoachsName() {
    return this.formCreatingCareer.get('coachsName')!.value;
  }

  public submitForm(): void {
    console.log(this.formCreatingCareer.value);
    if (this.formCreatingCareer.valid) {
      const form = Object.assign({}, this.formCreatingCareer.value);
      console.log(form);
    }
  }

  onSearchUpdatedNation(nationName: string) {
    this.searchQueryNation.set(nationName);
  }

  onSearchUpdatedFifaVersion(sq: string) {
    this.searchQueryFifaVersion.set(sq);
  }
}
