import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NewCareer } from '../../models/career/new-career';

@Component({
  selector: 'app-creating-career',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgFor],
  templateUrl: './creating-career.component.html',
  styleUrl: './creating-career.component.scss',
})
export class CreatingCareerComponent implements OnInit {
  #fb = inject(FormBuilder);
  formCreatingCareer!: FormGroup;

  selectedFifaCareer: ReadonlyArray<string> = [
    "FIFA 16",
    "FIFA 17",
    "FIFA 18",
    "FIFA 19",
    "FIFA 20",
    "FIFA 21",
    "FIFA 22",
    "FIFA 23",
  ]

  ngOnInit(): void {
   this.formCreatingCareer = this.#fb.group({
    fifaCareer: ["", Validators.required],
    teamCareer: ["", Validators.required],
    coachsName: ["", Validators.required],
    nationality: ["", Validators.required],
    urlImageCoach: ["", Validators.required],
    });
  }
  get getUrl() {
    return this.formCreatingCareer.get("urlImageCoach")!.value
  }

  get getCoachsName() {
    return this.formCreatingCareer.get("coachsName")!.value
  }

  public submitForm(): void {
    console.log(this.formCreatingCareer.value)
    if (this.formCreatingCareer.valid) {
     const form = Object.assign({}, this.formCreatingCareer.value);
     console.log(form)
    }
  }
}
