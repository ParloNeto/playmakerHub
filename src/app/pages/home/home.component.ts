import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { CareerService } from '../services/career.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { NewCareer } from '../../models/career/new-career';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, AsyncPipe, NgClass, ModalComponent, MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  #careerService = inject(CareerService);

  public getCareer = this.#careerService.getCareers;

  ngOnInit(): void {
    this.#careerService.httpCareers$().subscribe();
  }

  public careerExists(data: NewCareer[]): string {
    if (data) {
      return "top";
    }
    return "";
  }
}
